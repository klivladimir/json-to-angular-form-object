import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { ArrayType, ControlType, ElementTypes, FormElements, GroupType } from './models';

export enum FormStateSettings {
  'value',
  'objectWithoutValue',
  'objectWithValue',
  'empty',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  formStateSettingsControl = new FormControl('value');
  typedFormSettingsControl = new FormControl(false);

  load$ = new Subject();

  formElements$: Observable<FormElements[]>;

  file?: File;
  processedFile = './assets/example.json';
  fileName = '';
  toastCopied = true;
  wrongFormat = false;

  @ViewChild('jsonElement') private jsonElement!: ElementRef;

  get FormStateSettings() {
    return FormStateSettings;
  }

  constructor(private cdkClipboard: Clipboard, private cd: ChangeDetectorRef) {
    this.formElements$ = this.load$.pipe(
      startWith(true),
      switchMap(() => ajax.get(this.processedFile)),
      tap(data => {
        if (typeof data.response === 'object') {
          this.jsonElement.nativeElement.innerText = JSON.stringify(data.response, null, 4);
        }
      }),
      map(data => {
        this.fileName = this.fileName || 'Example';
        if (data.response && typeof data.response === 'object') {
          return this.generate({ data: data.response });
        } else {
          try {
            return this.generate({ data: JSON.parse(data.response as string) });
          } catch (err) {
            console.error('ooooops', err);
            return [];
          }
        }
      }),
      shareReplay()
    );
  }

  generate({ data, levelUp }: { data: object; levelUp?: number }): Array<FormElements> {
    const level = levelUp || 1;
    const mainGroup = [];
    for (const key in data) {
      const value: any = data[key as keyof object];

      switch (true) {
        // null
        case typeof value === 'object' && !value:
          mainGroup.push(
            this.addControl({
              key,
              value,
              level,
              text: '',
              elementType: ElementTypes.control,
              inputType: 'null',
            })
          );
          continue;

        // objects
        case typeof value === 'object' && value && !Array.isArray(value):
          mainGroup.push({
            key,
            level,
            elementType: ElementTypes.group,
            children: this.generate({ data: value, levelUp: level + 1 }),
          } as GroupType);
          continue;

        // all primitive types
        case typeof value !== 'object':
          mainGroup.push(
            this.addControl({
              key,
              value,
              level,
              text: '',
              elementType: ElementTypes.control,
              inputType: typeof value,
            })
          );
          continue;
      }

      if (Array.isArray(value)) {
        if (value.every(v => typeof v === 'object')) {
          const children = this.generate({ data: { group: value[0] }, levelUp: level + 1 });
          mainGroup.push({ key, children, level, elementType: ElementTypes.array } as ArrayType);
        } else {
          mainGroup.push(
            this.addControl({
              key,
              value,
              level,
              text: '',
              elementType: ElementTypes.control,
              inputType: 'any[]',
            })
          );
        }
      }
    }
    return mainGroup;
  }

  addControl({ key, value, level, elementType, inputType }: ControlType): ControlType {
    const jsonValue = this.formatInputValue(inputType, value);
    const formControlInitialValue = `<span class="value">${this.formControlInitialValue(jsonValue)}</span>`;
    const type = `<span class="type">${this.typedFormSettingsControl.value ? '&lt;' + inputType + '&gt;' : ''}</span>`;

    const controlText = `${key}: new FormControl${type}(${formControlInitialValue}),`;
    return { key, value, level, elementType, inputType, text: controlText };
  }

  formatInputValue(inputType: ControlType['inputType'], value: ControlType['value']) {
    switch (inputType) {
      case 'any[]':
        value = value as any[];
        if (value.every((el: unknown) => typeof el === 'number')) {
          return `[${value.join(', ')}]`;
        } else {
          return `[${value.map((value: string) => `'${value}'`).join(', ')}]`;
        }
      case 'string':
        return "'" + value + "'";
      case 'boolean':
        return value;
      case 'number':
        return value;
    }
  }

  formControlInitialValue(jsonValue: any): string {
    if (this.formStateSettingsControl.value === FormStateSettings[FormStateSettings.value]) {
      return `${jsonValue}`;
    } else if (this.formStateSettingsControl.value === FormStateSettings[FormStateSettings.objectWithValue]) {
      return `{value: ${jsonValue}}`;
    } else if (this.formStateSettingsControl.value === FormStateSettings[FormStateSettings.objectWithoutValue]) {
      return `{value: ''}`;
    } else if (this.formStateSettingsControl.value === FormStateSettings[FormStateSettings.empty]) {
      return '';
    } else {
      return '';
    }
  }

  onFileChange(event: Event) {
    const { files } = event.target as HTMLInputElement;
    if (files?.length && files[0].type === 'application/json') {
      this.file = files[0];
      this.wrongFormat = false;
    } else {
      this.wrongFormat = true;
    }
  }

  processJson() {
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.processedFile = reader?.result as string;
        this.load$.next(true);
      };
      this.fileName = this.file.name;
    }
  }

  copyToClipboard(code: HTMLDivElement) {
    this.cdkClipboard.copy(code.innerText);
    this.toastCopied = false;
    setTimeout(() => {
      this.toastCopied = true;
      this.cd.markForCheck();
    }, 1500);
  }

  onJsonChange(json: HTMLPreElement) {
    this.processedFile = 'data:application/json;base64,' + btoa(JSON.stringify(json.innerText));
    this.load$.next(true);
  }
}
