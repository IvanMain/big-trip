import { FormConfig } from '../../constants/enum';
import { createElement } from '../../util/render';
import { createFormTemplate } from '../templates/create-form-template';

export default class EditPointView {
  getTemplate() {
    return createFormTemplate(FormConfig.EDIT);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
