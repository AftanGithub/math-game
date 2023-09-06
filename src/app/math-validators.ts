import {AbstractControl} from '@angular/forms';

export class MathValidators {
    static addition(target:string,sourceOne:string,sourceTwo:string){
       
      return (form:AbstractControl)=>{
        let sum = form.value[target];
        let num1 = form.value[sourceOne];
        let num2 = form.value[sourceTwo];
        
        if(num1 + num2===parseInt(sum)){
          return null;
        }
    
        return {"addition":true}
      }
    }
}
