import { Component } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent {
  secondsPerSolution = 0;
  myForm = new FormGroup({
    a:new FormControl(this.getRandomNumber()),
    b:new FormControl(this.getRandomNumber()),
    answer:new FormControl('')
  },[MathValidators.addition('answer','a','b')]);

  ngOnInit(){
   
    this.myForm.statusChanges.pipe(
      filter(value=>value==='VALID'),
    delay(200),
    scan((acc)=>{
      return {
        numbersSolved: acc.numbersSolved + 1,
        startTime:acc.startTime
      }
    },{numbersSolved:0,startTime:new Date()})
    )
    .subscribe(({numbersSolved,startTime})=>{
      
      this.secondsPerSolution = (
        new Date().getTime() - startTime.getTime()
      ) / numbersSolved / 1000
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
