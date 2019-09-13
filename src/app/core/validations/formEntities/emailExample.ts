import { Field } from "../validate.service";

export class ValidEntity {
  constructor() {}
  email: Field = {
    value: '',
    validate: ["isEmail", { minLength: 4 }],
    errors: [],
    useCases: ["blur"]
  };
}
