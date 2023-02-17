import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { color } from '../helpers';
import { ControlType } from '../models';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent {
  constructor(public domSanitizer: DomSanitizer) {}

  @Input() control!: ControlType;

  color = color;
}
