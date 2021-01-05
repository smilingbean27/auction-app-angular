import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function CustomPasswordValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {

    return (control: AbstractControl): any => {
        if(!control.value){
            return null;
        }
        const valid = regex.test(control.value);
        return valid ? null: error; 
    }
}