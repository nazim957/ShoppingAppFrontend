import { FormControl, ValidationErrors } from "@angular/forms";

export class ShoppyValidators {

    //for blank space
    static notOnlyWhitespace(controls:FormControl): ValidationErrors|null{

        //check if has only whitespaces
        if((controls.value!=null) && (controls.value.toString().trim().length===0)){
            //invalid return error object
            return {'notOnlyWhitespace':true}
        }
        else
        //valid , return null
        return null;
    }
}
