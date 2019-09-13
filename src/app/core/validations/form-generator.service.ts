import { Injectable, ElementRef } from "@angular/core";
import { fromEvent, from, interval, merge, pipe } from "rxjs";

import {
  map,
  switchMap,
  tap,
  debounceTime,
  distinct,
  mergeMap,
  filter
} from "rxjs/operators";

import { ValidationCoreService, FormWithValidations } from "./validate.service";

export interface Field {
  value: string | boolean;
  errors: string[];
  touched?: boolean;
  valid?: boolean;
  showMessages?: boolean;
  getState?(ent: FormWithValidations): void;
}

@Injectable()
export class FormGeneratorService {
  form: Array<any[]>;
  constructor(public validCore: ValidationCoreService) {}
  private defaultEvent = "blur";

  private checkDebounce(stream: any, option: any) {
    return stream;
  }
  private setDetectingEvents(target: any, ...options) {
    return options[0].length
      ? options[0]
          .map((option: any) => {
            return target.type === "tel"
              ? fromEvent(target, option).pipe(debounceTime(800))
              : fromEvent(target, option);
          })
          .reduce((acc: any, current: any) => merge(acc, current))
      : fromEvent(target, this.defaultEvent);
  }

  public createForm(entity: FormWithValidations, form: ElementRef) {
    for (const field in entity) {
      entity[field].touched = false;
      entity[field].valid = false;
      entity[field].showMessages = false;
      entity[field].getState = () => {
        this.validCore.checkField(entity[field]);
        entity[field].showMessages = true;
        entity[field].touched = true;
      };
    }

    entity.form = {
      validForm: false,
      getState(ent: FormWithValidations) {
        const values = Object.values(ent);
        const keys = Object.keys(ent);
        const first = values.findIndex((el: any) => el.valid === false);
        ent.form.validForm = first === -1;
      }
    };

    const nativeForm = form.nativeElement;

    const arrayInputs = Array.from(nativeForm.querySelectorAll("input"));

    const baseInterval = interval(1000);
    const obs$ = baseInterval.pipe(
      switchMap(res => from(nativeForm.querySelectorAll("input"))),
      distinct()
    );

    // This part represents messages only on focused fields + when the submit is pressed - first invalid field message is shown
    /////////////////////////////////////////
    const focuses$ = obs$.pipe(
      mergeMap((input: any) => {
        return fromEvent(input, "focus");
      })
    );
    const blurs$ = obs$.pipe(
      mergeMap((input: any) => {
        return fromEvent(input, "blur");
      })
    );
    const toggleMessagesOnFocus = focuses$.subscribe((res: any) => {
      const targetField = res.target.name;
      for (const field in entity) {
        entity[field].showMessages = false;
      }
      if (targetField && entity[targetField]) {
        entity[targetField].showMessages = true;
      }
    });

    const submitButton$ = baseInterval.pipe(
      switchMap((res: any) =>
        from([
          nativeForm.querySelector('button[type="submit"]'),
          nativeForm.querySelector('input[type="submit"]')
        ]).pipe(
          filter((res: any) => res),
          distinct()
        )
      )
    );

    const pressSubmit$ = submitButton$.pipe(
      switchMap((submitButton: any) => fromEvent(submitButton, "click"))
    );

    const showAllMessagesOnSubmit = pressSubmit$.subscribe((res: any) => {
      const values = Object.values(entity);
      const keys = Object.keys(entity);
      const first = values.findIndex((el: any) => el.valid === false);
      const key = keys[first];
      for (const field in entity) {
        if (field !== "form") {
          entity[field].showMessages = false;
        }
      }
      if (key) {
        this.validCore.checkField(entity[key]);
        entity[key].showMessages = true;
        entity[key].touched = true;
      }
    });

    const evs$ = obs$.pipe(
      mergeMap((input: any) => {
        const name = input.name;
        const options =
          name && entity && entity[name]
            ? entity[name].useCases
            : [this.defaultEvent];
        return this.setDetectingEvents(input, options);
      })
    );

    const validateStream$ = evs$
      .pipe(
        filter((event: any) => event.target.name && entity[event.target.name]),
        map((event: any) => {
          const field = event.target.name;
          entity[field].value =
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value;
          this.validCore.checkField(entity[field]);
          return event;
        })
      )
      .subscribe((event: any) => {
        const name = event.target.name;
        const field = entity[name];
        field.valid = !field.errors.length;
        entity[name].touched = true;
        const valids = Object.values(entity).filter(
          (field: any) => field.valid === false
        );
        entity.form.validForm = !valids.length;
      });
    return entity;
  }
}
