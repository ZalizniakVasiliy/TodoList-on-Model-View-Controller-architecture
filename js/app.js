"use strict";

function findParentElemByClass(currentElem, parentClassName) {
  if (currentElem === null) return null;

  if (currentElem.classList.contains(parentClassName)) {
    return currentElem;
  }

  return findParentElemByClass(currentElem.parentElement, parentClassName);
}

(function () {
  let controllerInstance = controller(view, model);
  view.init(controllerInstance);
  model.init(controllerInstance);
})();
