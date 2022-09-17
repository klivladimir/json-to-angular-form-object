import {Component, Input} from '@angular/core';
import {color} from "../helpers";
import {GroupType} from "../models";
import {growInRight} from "../animations";


@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
  animations: [growInRight]
})
export class ArrayComponent {

  color = color

  @Input() element!: GroupType;


}
