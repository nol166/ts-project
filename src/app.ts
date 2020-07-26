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
        if (
            title.trim().length === 0 ||
            description.trim().length === 0 ||
            people.trim().length === 0
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
