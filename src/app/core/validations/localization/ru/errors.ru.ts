export const errorsRu = {
    isRequired: 'Обязательное поле',
    isEmail: 'Введите коректный e-mail',
    minLength(options) {
        return `Минимум ${options} символов`;
    },
    maxLength(options) {
        return `Максимум ${options} символов`;
    }
};
