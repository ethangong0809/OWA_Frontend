import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyChar]'
})
export class OnlyChar {

  constructor(private el: ElementRef) { }

  @Input() OnlyChar: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if (this.OnlyChar) {
      if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          
          return;
        }
        
        if ((e.keyCode < 65 || e.keyCode > 90)) {
            e.preventDefault();
        }
      }
  }
}