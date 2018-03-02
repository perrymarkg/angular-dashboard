import { trigger, state, style, transition, animate } from '@angular/core';

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate('500ms', style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate('200ms', style({opacity:0})) 
    ])
])

export const fadeInOutCustom = (enterSpeed = '500ms', leaveSpeed = '500ms') => trigger('fadeInOutCustom', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(enterSpeed, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(leaveSpeed, style({opacity:0})) 
    ])
])

export const flyInFromLeft =  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate('200ms')
    ])    
  ])