/**
 * @description validate duplicate value control from FormArray
 * @use this.fb.array([], [CustomUniqueValidators('fieldName'), CustomUniqueValidators('AnotherFieldNaMe')])
 */

import { FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

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
    const controls = (<FormArray>formArray).controls;
    const len = controls.length;
    if (len > 1) {
      let find: boolean = false;

      const errorObj = { duplicate: true } as const;

      controls.forEach((formGroup: any, index: number) => {
        const control = formGroup.get(fieldName);
        const val = control?.value;

        if (val) {
          for (let i = 0; i < len; i++) {
            console.log(index, i);
            if (index === i) {
              continue;
            }

            const innerControl = controls[i].get(fieldName) as any;

            if (!innerControl) {
              return;
            }
            const innerControlVal = innerControl.value;
            // Compare two values
            if (val === innerControlVal) {
              if (isBlank(control.errors)) {
                control.setErrors(errorObj);
              } else {
                control.setErrors(Object.assign(control.errors, errorObj));
              }
              // For Array Error
              if (!find) {
                find = true;
              }
            }
          }
        }
      });
      if (find) {
        // Set errors to whole formArray
        return errorObj;
      }
    }
    return null;
  };
};
