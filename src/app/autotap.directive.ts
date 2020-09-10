import {Directive, HostListener, Input} from '@angular/core'

 @Directive({
  selector: '[appAutoTab]'
})
export class AutoTabDirective {
  @Input('appAutoTab') appAutoTab

   @HostListener('input', ['$event.target']) onInput(input) {
    const length = input.value.length
    const maxLength = input.attributes.maxlength.value
    let d3 = input.value.slice(15, 16);
    if(length==0){
        return;
    }
    if (d3==1||d3==2||d3==3||d3==4||d3==5||d3==6||d3==7||d3==8||d3==9||d3==0) {
    this.appAutoTab.focus()
    }
  }
}