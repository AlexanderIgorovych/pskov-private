import { Injectable } from '@angular/core';
import { conditionGenerator, ValidationError } from './mainErrors';
import { Field } from './validate.service';

export type Condition = (
  input: string,
  option?: string | number | Field
) => undefined | ValidationError;

@Injectable()
export class ValidateService {
  constructor() {}

  conditions: { [key: string]: Condition } = {
    isRequired(input, error?) {
      const condition = input.length > 0;
      const errorGenerator = 'isRequired';
      const computedCondition = conditionGenerator(
        condition,
        errorGenerator,
        error
      );
      return computedCondition;
    },

    isEmail(input, error?) {
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
      const condition = reg.test(input);
      const errorGenerator = 'isEmail';
      const computedCondition = conditionGenerator(
        condition,
        errorGenerator,
        error
      );
      return computedCondition;
    },

    doesContainEmailAt(input, error?) {
      const condition = input.includes('@');
      const errorGenerator = 'doesContainEmailAt';
      const computedCondition = conditionGenerator(
        condition,
        errorGenerator,
        error
      );
      return computedCondition;
    },

    minLength(input, min) {
      const condition = input.length >= min;
      const errorGenerator = 'minLength';
      const computedCondition = conditionGenerator(
        condition,
        errorGenerator,
        min
      );
      return computedCondition;
    },

    maxLength(input, max) {
      const condition = input.length <= max;
      const errorGenerator = 'maxLength';
      const computedCondition = conditionGenerator(
        condition,
        errorGenerator,
        max
      );
      return computedCondition;
    },

    isPhone(input, error?) {
      const cleanUp = input
        .split('')
        .filter((char: any) => isNaN(Number(char)));
      const condition =
        cleanUp.length === 0 && (input.length > 8 && input.length < 14);
      const errorGenerator = 'isPhone';
      const computedCondition = conditionGenerator(
        condition,
        errorGenerator,
        error
      );
      return computedCondition;
    },

    testEquality(input, example: Field) {
      const condition = input === example.value;
      const errorGenerator = 'testEquality';
      const computedCondition = conditionGenerator(condition, errorGenerator);
      return computedCondition;
    },

    isValidString(input, error?) {
      const reg = /\s|[0-9_]|\W|[#$%^&*()]/g;
      const arePresentcondition = reg.test(input);
      const condition = !arePresentcondition;
      const errorGenerator = 'isValidString';
      const computedCondition = conditionGenerator(
        condition,
        errorGenerator,
        error
      );
      return computedCondition;
    }
  };

  getConditions() {
    return this.conditions;
  }
}
