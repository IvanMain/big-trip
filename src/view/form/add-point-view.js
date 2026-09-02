import { FormConfig } from '../../configs/form-config';
import AbstractView from '../../framework/view/abstract-view';
import { createFormTemplate } from '../templates/create-form-template';

export default class AddPointView extends AbstractView {
  constructor({ point, offers, destination }) {
    super();
    this.point = point;
    this.offers = offers;
    this.destination = destination;
  }

  get template() {
    return createFormTemplate({
      config: FormConfig.ADD,
      point: this.point,
      offers: this.offers,
      destination: this.destination
    });
  }
}
