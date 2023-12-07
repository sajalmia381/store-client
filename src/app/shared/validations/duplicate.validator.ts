/**
 * @description validate duplicate value control from FormArray
 * @use this.fb.array([], [CustomUniqueValidators('fieldName'), CustomUniqueValidators('AnotherFieldNaMe')])
 */

import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

const isNil = (value: any): value is null | undefined => {
  return value === null || typeof value === 'undefined';
};

const isObject = (value: any): boolean => {
  return value && value.constructor === Object;
};

const isBlank = (value: any): boolean => {
  return isNil(value) || (isObject(value) && Object.keys(value).length === 0) || value.toString().trim() === '';
};

const isPresent = (value: any): boolean => {
  return !isBlank(value);
};

export const CustomDuplicateValidators = (fieldName: string, caseSensitive: boolean = true): ValidatorFn => {
  return (formArray): ValidationErrors | null => {
    const controls: AbstractControl[] = (<FormArray>formArray).controls.filter((formGroup: any) => {
      return isPresent(formGroup.get(fieldName).value);
    });
    const errorObj = { duplicate: true } as const;
    let find: boolean = false;

    if (controls.length > 1) {
      for (let i: number = 0; i < controls.length; i++) {
        const formGroup: FormGroup | any = controls[i];
        const mainControl: AbstractControl = formGroup.get(fieldName);

        const val: string = mainControl.value;

        const mainValue: string = caseSensitive ? val.toLowerCase() : val;
        controls.forEach((group: any, index: number) => {
          if (i === index) {
            // Same group
            return;
          }

          const currControl: any = group.get(fieldName);
          const tempValue: string = currControl.value;
          const currValue: string = caseSensitive ? tempValue.toLowerCase() : tempValue;
          let newErrors: any;

          if (mainValue === currValue) {
            if (isBlank(currControl.errors)) {
              newErrors = errorObj;
            } else {
              newErrors = Object.assign(currControl.errors, errorObj);
            }

            find = true;
          } else {
            newErrors = currControl.errors;

            if (isPresent(newErrors)) {
              // delete duplicate error
              delete newErrors['duplicate'];
              if (isBlank(newErrors)) {
                // {} to undefined/null
                newErrors = null;
              }
            }
          }

          // Add specific errors based on condition
          currControl.setErrors(newErrors);
        });
      }

      if (find) {
        // Set errors to whole formArray
        return errorObj;
      }
    }

    // Clean errors
    return null;
  };
};