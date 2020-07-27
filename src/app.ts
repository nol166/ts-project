// validation logic
interface Validatable {
    value: string | number
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
}

function validate(validatableInput: Validatable) {
    let isValid = true
    if (validatableInput.required) {
        isValid =
            isValid && validatableInput.value.toString().trim().length !== 0
    }
    if (
        validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid &&
            validatableInput.value.length >= validatableInput.minLength
    }
    if (
        validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid &&
            validatableInput.value.length <= validatableInput.maxLength
    }
    if (
        validatableInput.min != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value >= validatableInput.min
    }
    if (
        validatableInput.max != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value <= validatableInput.max
    }
    return isValid
}

// autobind decorator
const autoBind = (
    _target: any,
    _methodName: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        },
    }
    return adjDescriptor
}
// ProjectInput class

class ProjectInput {
    templateEl: HTMLTemplateElement
    hostEl: HTMLDivElement
    element: HTMLElement
    titleInput: HTMLInputElement
    descriptionInput: HTMLInputElement
    peopleInput: HTMLInputElement

    constructor() {
        this.templateEl = document.getElementById(
            'project-input'
        )! as HTMLTemplateElement
        this.hostEl = document.getElementById('app')! as HTMLDivElement

        const importedHTML = document.importNode(this.templateEl.content, true)
        this.element = importedHTML.firstElementChild as HTMLFormElement
        this.element.id = 'user-input'

        //  populate input fields
        this.titleInput = this.element.querySelector(
            '#title'
        ) as HTMLInputElement
        this.descriptionInput = this.element.querySelector(
            '#description'
        ) as HTMLInputElement
        this.peopleInput = this.element.querySelector(
            '#people'
        ) as HTMLInputElement
        this.setUpListeners()
        this.attach()
    }

    private clearInput() {
        this.titleInput.value = ''
        this.descriptionInput.value = ''
        this.peopleInput.value = ''
    }

    private getUserInput(): [string, string, number] | void {
        const title = this.titleInput.value
        const description = this.descriptionInput.value
        const people = this.peopleInput.value
        // TODO: make validation better
        const titleValidatable: Validatable = {
            value: title,
            required: true,
        }
        const descriptionValidatable: Validatable = {
            value: description,
            required: true,
            min: 5,
        }
        const peopleValidatable: Validatable = {
            value: +people,
            required: true,
            min: 1,
            max: 5,
        }

        if (
            !validate(titleValidatable) &&
            !validate(descriptionValidatable) &&
            !validate(peopleValidatable)
        ) {
            alert('you must enter something')
            return
        } else {
            return [title, description, +people]
        }
    }

    @autoBind
    private submitHandler(e: Event) {
        // get values
        e.preventDefault()
        const userInput = this.getUserInput()
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput
            console.log(title, description, people)
        }
        this.clearInput()
        // validate them
    }

    private setUpListeners() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element)
    }
}

const projInput = new ProjectInput()
