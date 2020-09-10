import { Directive } from '@angular/core';

@Directive({
selector: '[appOnlyInteger]',
host: {
'(input)': '_onKeydown($event, $event.target)'
}
})
export class OnlyIntegerDirective {

constructor() { }

_onKeydown(e: any, target: any) {
//console.log(target.value);/^\d+$/
let num = target.value.match(/^[0-9]*$/);
//console.log(target.value, num) 
if (num === null)
target.value = target.value.substring(0, target.value.length-1);
}
}