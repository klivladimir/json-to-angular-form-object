import { Component, Input } from '@angular/core';

import { color } from '../helpers';
import { GroupType } from '../models';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  color = color;

  @Input() element!: GroupType;
}
