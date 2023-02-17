import { Component, Input } from '@angular/core';

import { asControl, asGroup } from '../helpers';
import { ControlType, ElementTypes, FormElements } from '../models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  asGroup = asGroup;
  asControl = asControl;

  elementTypes = ElementTypes;

  _elementsArray!: FormElements[];

  _control!: ControlType;

  @Input() set elementsArray(value: FormElements[] | ControlType) {
    if (value && 'inputType' in value) {
      this._control = value;
    } else if (Array.isArray(value)) {
      this._elementsArray = value;
    }
  }

  @Input()
  useFormBuilder!: boolean;
}
