import {animate, style, transition, trigger} from "@angular/animations";

export const growInRight = trigger('growInRight', [
  transition(':enter', [
    style({opacity: 0, transform: 'translate(0, -20px)'}),
    animate(`100ms 0ms ease-in-out`, style({opacity: 1, transform: 'translate(0px, 0px)'}))
  ])
]);
