import { errorsRu } from "./localization/ru/errors.ru";
export interface ValidationError {
  field: string;
  message: string;
}
export const mainErrors = {
  ru: errorsRu
};

export function generateError(type, options?): ValidationError {
  let locale = localStorage.getItem("locale") || "ru";
  let invalidMessage = {
    field: type,
    message: options ? options : mainErrors[locale][type]
  };
  return invalidMessage;
}

export function conditionGenerator(
  condition,
  errorGenerator,
  options?
): ValidationError | undefined {
  if (condition) {
    return;
  } else {
    return generateError(errorGenerator, options);
  }
}
