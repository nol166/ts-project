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

    @autoBind
    private submitHandler(e: Event) {
        // get values
        e.preventDefault()
        let titleVal = this.titleInput.value
        console.log('ProjectInput -> submitHandler -> titleVal', titleVal)

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
