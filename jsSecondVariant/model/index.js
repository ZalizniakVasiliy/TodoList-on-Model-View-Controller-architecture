"use strict";

const model = {
  controller: null,

  setData(data) {
    const keyInDataBase = data.id;
    delete data.id;

    if (!localStorage.getItem(keyInDataBase)) {
      let arr = [];
      arr.push(data);
      localStorage.setItem(keyInDataBase, JSON.stringify(arr));
      return;
    }

    const existingData = JSON.parse(localStorage.getItem(keyInDataBase));
    existingData.push(data);
    localStorage.setItem(keyInDataBase, JSON.stringify(existingData));
  },

  getData(id) {
    return JSON.parse(localStorage.getItem(id));
  },

  changeCompleted(elemId, dataBaseKey, statusExecution) {
    const data = JSON.parse(localStorage.getItem(dataBaseKey));
    const currentElem = data.find((todoItem) => todoItem.elemId === +elemId);
    currentElem.completed = statusExecution;
    localStorage.setItem(dataBaseKey, JSON.stringify(data));
  },

  deleteItem(dataBaseKey, elemId) {
    const data = JSON.parse(localStorage.getItem(dataBaseKey));
    const currentElemIndex = data.findIndex(
      (todoItem) => todoItem.elemId === +elemId
    );
    data.splice(currentElemIndex, 1);
    localStorage.setItem(dataBaseKey, JSON.stringify(data));
  },

  deleteTodoContainer(dataBaseKey) {
    localStorage.removeItem(dataBaseKey);
  },

  init(controllerInstance) {
    this.controller = controllerInstance;
  },
};
