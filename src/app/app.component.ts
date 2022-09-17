import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith, Subject, switchMap} from "rxjs";
import {ajax} from "rxjs/ajax";
import {ArrayType, ControlType, ElementTypes, FormElements, GroupType} from "./models";
import {Clipboard} from "@angular/cdk/clipboard";


export enum FormStateSettings {
  'value',
  'objectWithoutValue',
  'objectWithValue',
  'null',
  'empty'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {

  formStateSettings = new FormControl('value')
  typedFormSettings = new FormControl(false)

  load$ = new Subject();

  formElements$: Observable<FormElements[]>;

  file?: File;
  processedFile = './assets/example.json';
  fileName = '';
  toastCopied = true;

  get FormStateSettings() {
    return FormStateSettings
  }

  constructor(private cdkClipboard: Clipboard, private cd: ChangeDetectorRef) {
    this.formElements$ = this.load$
      .pipe(
        startWith(true),
        switchMap(() => ajax.get(this.processedFile)
          .pipe(
            map((data) => {
              this.fileName = this.fileName || 'Example'
              if (data.response && typeof data.response === 'object') {
                return this.generate({data: data.response})
              } else {
                return []
              }
            })
          )
        )
      )
  }


  generate({data, levelUp}: { data: object, levelUp?: number }): Array<FormElements> {
    let level = levelUp || 1;
    const mainGroup = [];
    for (let key in data) {

      const value: any = data[key as keyof object];


      switch (true) {

        // null
        case typeof value === "object" && !value:
          mainGroup.push(this.addControl({
            key,
            value,
            level, text: '',
            elementType: ElementTypes.control,
            inputType: 'null'
          }))
          continue

        // objects
        case typeof value === 'object' && value && !Array.isArray(value):
          mainGroup.push({
              key,
              level,
              elementType: ElementTypes.group,
              children: this.generate({data: value, levelUp: level + 1}
              )
            } as GroupType
          );
          continue

        // all primitive types
        case typeof value !== 'object':
          mainGroup.push(this.addControl({
            key,
            value,
            level,
            text: '',
            elementType: ElementTypes.control,
            inputType: typeof value
          }))
          continue
      }

      if (Array.isArray(value)) {
        if (value.every((v) => typeof v === 'object')) {
          const children = this.generate({data: {group: value[0]}, levelUp: level + 1})
          mainGroup.push({key, children, level, elementType: ElementTypes.array} as ArrayType);
        } else {
          mainGroup.push(this.addControl({
            key,
            value,
            level,
            text: '',
            elementType: ElementTypes.control,
            inputType: 'any[]'
          }));
        }
      }
    }
    return mainGroup
  }

  addControl({key, value, level, elementType, inputType}: ControlType): ControlType {
    let jsonValue = this.formatInputValue(inputType, value)
    let formControlInitialValue = `<span class="value">${this.formControlInitialValue(jsonValue)}</span>`;
    const type = `<span class="type">${this.typedFormSettings.value ? '&lt;' + inputType + '&gt;' : ''}</span>`
    const controlText = `${key}: new FormControl${type}(${formControlInitialValue}),`
    return {key, value, level, elementType, inputType, text: controlText};
  }

  formatInputValue(inputType: ControlType['inputType'], value: ControlType['value']) {
    switch (inputType) {
      case "null":
        return `null`
      case "any[]":
        value = value as any[]
        if (value.every((el: unknown) => typeof el === 'number')) {
          return `[${value.join(', ')}]`
        } else {
          return `[${value.map((value: string) => `'${value}'`).join(', ')}]`
        }
      case 'string':
        return ("\'" + value + "\'")
      case 'boolean':
        return value
      case 'number':
        return value
    }
  }

  formControlInitialValue(jsonValue: any): string {
    if (this.formStateSettings.value === 'value') {
      return `${jsonValue}`
    } else if (this.formStateSettings.value === 'objectWithValue') {
      return `{value: ${jsonValue}}`
    } else if (this.formStateSettings.value === 'objectWithoutValue') {
      return `{value: ''}`
    } else if (this.formStateSettings.value === 'null') {
      return 'null'
    } else if (this.formStateSettings.value === 'empty') {
      return ''
    } else {
      return ''
    }
  }

  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files
    if (files?.length) {
      this.file = files[0];
    }
  }

  processJson() {
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.processedFile = reader?.result as string
        this.load$.next(true)
      }
      this.fileName = this.file.name;
    }
  }

  copyToClipboard(code: HTMLDivElement) {
    this.cdkClipboard.copy(code.innerText)
    this.toastCopied = false
    setTimeout(() => {
      this.toastCopied = true;
      this.cd.markForCheck();
    }, 1500)
  }
}
