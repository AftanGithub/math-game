import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { pipe,map } from 'rxjs';
@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(private el:ElementRef,private form:NgControl) { }

  ngOnInit(){
    this.form.control?.parent?.valueChanges
    .pipe(map(({a,b,answer})=>Math.abs((a + b - answer) / (a+b))))
    .subscribe((value)=>{
      if(value < 0.2){
        this.el.nativeElement.classList.add('close');
      }else{
        this.el.nativeElement.classList.remove('close');
      }
    })
  }

}
