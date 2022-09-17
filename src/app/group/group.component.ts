import {Component, Input} from '@angular/core';
import {color} from "../helpers";
import {GroupType} from "../models";
import {growInRight} from "../animations";


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  animations: [growInRight]
})
export class GroupComponent {

  color = color

  @Input() element!: GroupType;


}
