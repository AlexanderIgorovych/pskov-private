import { ValidateService } from "./validate.conditions.service";
import { Injectable, Inject } from "@angular/core";
import { ValidationError } from "./mainErrors";

export interface Field {
  value: string;
  validate: Array<string | { [key: string]: string | number }>;
  errors?: ValidationError[];
  useCases?: string[];
  valid?: boolean;
  touched?: boolean;
  showMessages?: boolean;
}

export interface FormWithValidations {
  [key: string]: any;
  form?: {
    validForm: boolean;
    getState(ent: FormWithValidations): void;
  };
}

@Injectable()
export class ValidationCoreService {
  constructor(public validate: ValidateService) {}

  switchError(
    target: ValidationError[],
    error: ValidationError | undefined,
    validation: string | { [key: string]: string | number }
  ) {
    let presentError;

    if (typeof error === "undefined") {
      if (typeof validation === "object") {
        presentError = target.findIndex(function(item) {
          return item["field"] == Object.keys(validation)[0];
        });
      } else {
        presentError = target.findIndex(function(item) {
          return item["field"] == validation;
        });
      }

      if (presentError !== -1) {
        target.splice(presentError, 1);
      }
    } else {
      presentError = target.findIndex(function(item) {
        return item["message"] == error["message"];
      });

      if (presentError === -1) {
        target.push(error);
      }
    }
  }

  check(form: FormWithValidations) {
    let validateCondition: string,
      additionalOption = null,
      value: string;

    for (let field in form) {
      if (field !== "form") {
        form[field].validate.forEach(validation => {
          if (typeof validation === "string") {
            validateCondition = validation;
          } else {
            validateCondition = Object.keys(validation)[0];
            additionalOption = Object.values(validation)[0];
          }

          value = form[field]["value"];
          let errorHandler = this.validate.conditions[validateCondition];
          let test = form;
          let error = errorHandler(value, additionalOption);
          this.switchError(form[field]["errors"], error, validation);
        });
      }
    }
  }

  checkField(field: Field | string) {
    let validateCondition: string, value: string;

    if (typeof field !== "string") {
      field.validate.forEach(validation => {
        let additionalOption: string;
        if (typeof validation === "string") {
          validateCondition = validation;
        } else {
          validateCondition = Object.keys(validation)[0];
          additionalOption = Object.values(validation)[0].toString();
        }

        value = field["value"];
        let errorHandler = this.validate.conditions[validateCondition];

        let error = errorHandler(value, additionalOption);

        this.switchError(field.errors, error, validation);
        field.valid = !field.errors.length;
      });
    }
  }
}
