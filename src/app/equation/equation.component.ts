import { Component } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent {
  myForm = new FormGroup({
    a:new FormControl(this.getRandomNumber()),
    b:new FormControl(this.getRandomNumber()),
    answer:new FormControl('')
  },[MathValidators.addition('answer','a','b')]);

  ngOnInit(){
    this.myForm.statusChanges.pipe(filter(value=>value==='VALID'),delay(200)).subscribe((value)=>{
     this.myForm.setValue({
      a:this.getRandomNumber(),
      b:this.getRandomNumber(),
      answer:''
     })
    })
  }

  get a(){
    return this.myForm.value.a
  }

  get b(){
    return this.myForm.value.b
  }


  getRandomNumber(){
    return Math.floor(Math.random()*10);
  }
}
