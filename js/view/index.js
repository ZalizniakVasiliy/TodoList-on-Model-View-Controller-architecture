"use strict";

const view = {
  formId: `todoForm`,
  form: null,
  currentElemId: 0,
  todoContainerId: `todoItems`,
  todoContainer: null,
  deleteAllElemsBtn: null,
  controller: null,

  init(controllerInstance) {
    this.findForm();
    this.getTodoContainer();
    this.getDeleteAllElems();
    this.addEvents();
    this.controller = controllerInstance;
  },

  findForm() {
    const form = document.getElementById(this.formId);

    if (form === null || form.nodeName !== "FORM") {
      throw new Error("There is no such form on the page");
    }

    this.form = form;
    return form;
  },

  getTodoContainer() {
    const container = document.getElementById(this.todoContainerId);
    container ? (this.todoContainer = container) : null;
  },

  getDeleteAllElems() {
    this.deleteAllElemsBtn = this.form.querySelector(`.delete-all-elems`);
  },

  addEvents() {
    this.form.addEventListener("submit", (event) => this.formHandler(event));

    document.addEventListener(
      "DOMContentLoaded",
      this.preFillHandler.bind(this)
    );

    this.todoContainer.addEventListener(
      `change`,
      this.checkTodoElem.bind(this)
    );

    this.todoContainer.addEventListener(`click`, this.deleteElement.bind(this));

    this.deleteAllElemsBtn.addEventListener(
      `click`,
      this.deleteAllTodoElems.bind(this)
    );
  },

  formHandler(event) {
    event.preventDefault();
    this.currentElemId += 1;

    let data = {
      id: this.formId,
      completed: false,
      elemId: this.currentElemId,
      ...this.findInputs(),
    };

    this.controller.setData(data);
    this.todoContainer.prepend(this.createTemplate(data));
    event.target.reset();
  },

  findInputs() {
    return Array.from(
      this.form.querySelectorAll("input[type=text], textarea")
    ).reduce((accum, item) => {
      if (item.value.trim() === ``) {
        alert(`Enter a value in the fields`);
        throw new Error(`Input error`);
      }

      accum[item.name] = item.value;
      return accum;
    }, {});
  },

  createTemplate({ title, description, elemId, completed }) {
    const todoItem = this.createElement("div", "col-4");
    const taskWrapper = this.createElement("div", "taskWrapper");

    todoItem.append(taskWrapper);

    const taskHeading = this.createElement("div", "taskHeading", title);
    const taskDescription = this.createElement(
      "div",
      "taskDescription",
      description
    );
    let checkboxElemWrapper = this.createElement(`label`, `completed`);
    let innerContentCheckBox = `<input data-elem-id="${elemId}" type="checkbox" class="form-check-input" >`;
    checkboxElemWrapper.innerHTML = innerContentCheckBox;

    let checkboxElemStatus = this.createElement(
      `span`,
      `status-action`,
      "status"
    );
    let innerContentDeleteBtn = `<button class="btn btn-danger delete-btn" data-elem-id="${elemId}">Delete</button>`;

    taskWrapper.append(taskHeading);
    taskWrapper.append(taskDescription);
    taskWrapper.append(checkboxElemWrapper);
    checkboxElemWrapper.append(checkboxElemStatus);
    taskWrapper.innerHTML += innerContentDeleteBtn;

    todoItem.querySelector(`input[type=checkbox]`).checked = completed;

    return todoItem;
  },

  createElement(nodeName, classes, innerContent) {
    const el = document.createElement(nodeName);

    if (Array.isArray(classes)) {
      classes.forEach((singleClassName) => {
        el.classList.add(singleClassName);
      });
    } else {
      el.classList.add(classes);
    }

    if (innerContent) {
      el.innerHTML = innerContent;
    }

    return el;
  },

  preFillHandler() {
    const data = this.controller.getData(this.formId);

    if (!data || !data.length) return;

    this.currentElemId = data[data.length - 1].elemId;
    const todoContainer = document.getElementById(this.todoContainerId);

    data.forEach((todoItem) => {
      const template = this.createTemplate(todoItem);
      todoContainer.prepend(template);
    });
  },

  checkTodoElem({ target }) {
    const elemId = target.getAttribute(`data-elem-id`);
    const statusExecution = target.checked;

    this.controller.changeCompleted(elemId, this.formId, statusExecution);
  },

  deleteElement({ target }) {
    if (!target.classList.contains(`delete-btn`)) return;

    this.controller.deleteItem(
      this.formId,
      target.getAttribute(`data-elem-id`)
    );
    const todoElemContainer = findParentElemByClass(target, "taskWrapper");
    todoElemContainer.parentElement.remove();
  },

  deleteAllTodoElems() {
    this.controller.deleteAll(this.formId);
    this.todoContainer.innerHTML = "";
  },
};
