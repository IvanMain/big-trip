import { FormConfig } from '../../configs/form-config';
import { createElement } from '../../util/render';
import { createFormTemplate } from '../templates/create-form-template';

export default class EditPointView {
  constructor({ point, offers, destination }) {
    this.point = point;
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate() {
    return createFormTemplate({
      config: FormConfig.EDIT,
      point: this.point,
      offers: this.offers,
      destination: this.destination
    });
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
