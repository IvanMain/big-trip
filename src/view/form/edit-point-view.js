import { FormConfig } from '../../configs/form-config';
import AbstractView from '../../framework/view/abstract-view';
import { createFormTemplate } from '../templates/create-form-template';

export default class EditPointView extends AbstractView {
  #rollupButtonElement = null;
  #onEditToggle = null;

  constructor({ point, offers, destination, onEditToggle }) {
    super();
    this.point = point;
    this.offers = offers;
    this.destination = destination;

    this.#onEditToggle = onEditToggle;
    this.#rollupButtonElement = this.element.querySelector('.event__rollup-btn');

    this.#rollupButtonElement.addEventListener('click', this.#onFormSubmitHandler);
  }

  get template() {
    return createFormTemplate({
      config: FormConfig.EDIT,
      point: this.point,
      offers: this.offers,
      destination: this.destination
    });
  }

  #onFormSubmitHandler = (evt) => {
    evt.preventDefault();

    this.#onEditToggle();
  };
}
