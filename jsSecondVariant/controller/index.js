"use strict";

function controller(view, model) {
  return {
    setData(data) {
      if (!this.validateData(data)) throw new Error(`Error of a validation`);
      model.setData(data);
    },

    validateData(data) {
      if (Object.keys(data).length === 0) return false;

      for (const key in data) {
        if (data[key] === ``) return false;
      }

      return true;
    },

    getData(dataBaseKey) {
      if (!dataBaseKey) throw new Error(`Key of database is not defined`);
      return model.getData(dataBaseKey);
    },

    changeCompleted(elemId, dataBaseKey, statusExecution) {
      if (!elemId) throw new Error(`Id of element is not defined`);
      model.changeCompleted(elemId, dataBaseKey, statusExecution);
    },

    deleteItem(dataBaseKey, elemId) {
      if (!elemId) throw new Error(`No one id provided`);
      model.deleteItem(dataBaseKey, elemId);
    },

    deleteAll(dataBaseKey) {
      model.deleteTodoContainer(dataBaseKey);
    },
  };
}
