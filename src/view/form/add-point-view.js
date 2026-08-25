import { FormConfig } from '../../constants/enum';
import { createElement } from '../../util/render';
import { createFormTemplate } from './common-template/create-form-template';

export default class AddPointView {
  getTemplate() {
    return createFormTemplate(FormConfig.ADD);
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
