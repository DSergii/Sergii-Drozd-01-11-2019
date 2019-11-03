import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const showAnimation = trigger(
  'showAnimation',
  [
    transition(
      'void => *', [
        animate(500, keyframes([
          style({opacity: 0, transform: 'translateY(-50%)', offset: 0}),
          style({opacity: .2, transform: 'translateY(-35%)', offset: 0.2}),
          style({opacity: .4, transform: 'translateY(-20%)', offset: 0.4}),
          style({opacity: 1, transform: 'translateY(0%)', offset: 1.0})
        ]))
      ]
    )
  ]
);