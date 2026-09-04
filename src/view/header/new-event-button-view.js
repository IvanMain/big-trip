import AbstractView from '../../framework/view/abstract-view';

const createNewEventButtonTemplate = (isDisabled = true) => `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isDisabled ? 'disabled' : ''}>New event</button>
`;

export default class NewEventButtonView extends AbstractView {
  #isDisabled = true;

  constructor({ isDisabled }) {
    super();

    this.#isDisabled = isDisabled;
  }

  get template() {
    return createNewEventButtonTemplate(this.#isDisabled);
  }
}
