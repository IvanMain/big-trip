import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { FormConfig } from '../../configs/form-config.js';
import { createFormTemplate } from '../templates/create-form-template.js';

export default class EditPointView extends AbstractStatefulView {
  #rollupButtonElement = null;
  #editFormElement = null;

  #onEditToggle = null;

  constructor({ point, offers, destination, onEditToggle }) {
    super();
    this.point = point;
    this.offers = offers;
    this.destination = destination;

    this.#onEditToggle = onEditToggle;
    this.#rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    this.#editFormElement = this.element.querySelector('.event.event--edit');

    this.#rollupButtonElement.addEventListener('click', this.#formRollupClickHandler);
    this.#editFormElement.addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createFormTemplate({
      config: FormConfig.EDIT,
      point: this.point,
      offers: this.offers,
      destination: this.destination
    });
  }

  #formRollupClickHandler = (evt) => {
    evt.preventDefault();

    this.#onEditToggle();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this.#onEditToggle();
  };
}
