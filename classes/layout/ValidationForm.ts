class Validation<T> {
    validate: (value: T) => boolean;
    error: string;

    constructor({ validation, error }: { validation: (value: T) => boolean; error: string }) {
        this.validate = validation;
        this.error = error;
    }
}

export class ValidationField<T> {
    value: T;
    state: boolean | null;

    validations: Validation<T>[];

    get isValid() {
        return this.validations.every(x => x.validate(this.value));
    }

    get reactiveState() {
        return this.isValid ? null : false;
    }

    get error() {
        return this.validations.find(x => !x.validate(this.value))?.error;
    }

    refreshState() {
        this.state = !this.isValid ? false : null;
        return this;
    }

    constructor({ value, validations }: { value: T; validations: Validation<T>[] }) {
        this.value = value;
        this.state = null;
        this.validations = validations;
    }
}

export class ValidationForm {
    fields: ValidationField<any>[];

    get isValid() {
        return this.fields.every(x => x.isValid);
    }

    refreshState() {
        this.fields.forEach(x => x.refreshState());
        return this;
    }

    public static create(fields: ValidationField<any>[]) {
        const form = new ValidationForm(fields);
        return form;
    }

    constructor(fields: ValidationField<any>[]) {
        this.fields = fields;
    }
}
