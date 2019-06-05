import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom form validators
 */
export class V1FormValidators {

    /**
     * Check if input contains only whitespace
     */
    public static whitespace(control: AbstractControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    /**
     * Validate if the value contain only zeroes
     * Replace any non numeric characters and check
     */
    public static allZeroes(control: AbstractControl) {
        if (control.value) {
            return /^0*$/.test(control.value.replace(/[^\d+]/g, '')) ? { allZeroes: true } : null;
        } else {
            return null;
        }
    }

    /**
     * Validate Password
     */
    public static passwordValidator(control: AbstractControl) {
        if (!control.value.match(/[0-9]/)) {
            return { numberError: true };
        } else if (!control.value.match(/[A-Z]/)) {
            return { capError: true };
        } else if (!control.value.match(/[a-z]/)) {
            return { lowError: true };
        } else if (!control.value.match(/[" !#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/)) {
            return { specialError: true };
        } else if (control.value.length < 8) {
            return { minLength: true };
        } else {
            return null;
        }
    }

}
