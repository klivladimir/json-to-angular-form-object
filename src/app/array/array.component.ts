import { Component, Input } from '@angular/core';

import { color } from '../helpers';
import { GroupType } from '../models';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
})
export class ArrayComponent {
  color = color;

  @Input() element!: GroupType;
}
