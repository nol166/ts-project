class ProjectInput {
    templateEl: HTMLTemplateElement
    hostEl: HTMLDivElement
    element: HTMLElement

    constructor() {
        this.templateEl = document.getElementById(
            'project-input'
        )! as HTMLTemplateElement
        this.hostEl = document.getElementById('app')! as HTMLDivElement

        const importedHTML = document.importNode(this.templateEl.content, true)
        this.element = importedHTML.firstElementChild as HTMLFormElement
        this.attach()
    }

    private attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element)
    }
}

const projInput = new ProjectInput()
