"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const autoBind = (_target, _methodName, descriptor) => {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
};
class ProjectInput {
    constructor() {
        this.templateEl = document.getElementById('project-input');
        this.hostEl = document.getElementById('app');
        const importedHTML = document.importNode(this.templateEl.content, true);
        this.element = importedHTML.firstElementChild;
        this.element.id = 'user-input';
        this.titleInput = this.element.querySelector('#title');
        this.descriptionInput = this.element.querySelector('#description');
        this.peopleInput = this.element.querySelector('#people');
        this.setUpListeners();
        this.attach();
    }
    clearInput() {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
    }
    getUserInput() {
        const title = this.titleInput.value;
        const description = this.descriptionInput.value;
        const people = this.peopleInput.value;
        if (title.trim().length === 0 ||
            description.trim().length === 0 ||
            people.trim().length === 0) {
            alert('you must enter something');
            return;
        }
        else {
            return [title, description, +people];
        }
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
        }
        this.clearInput();
    }
    setUpListeners() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    autoBind
], ProjectInput.prototype, "submitHandler", null);
const projInput = new ProjectInput();
//# sourceMappingURL=app.js.map