"use strict";
class ProjectInput {
    constructor() {
        this.templateEl = document.getElementById('project-input');
        this.hostEl = document.getElementById('app');
        const importedHTML = document.importNode(this.templateEl.content, true);
        this.element = importedHTML.firstElementChild;
        this.attach();
    }
    attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
}
const projInput = new ProjectInput();
//# sourceMappingURL=app.js.map