import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { FormConfig } from '../../configs/form-config.js';
import { createFormTemplate } from '../templates/create-form-template.js';
import { isEscape } from '../../utils/common.js';

export default class AddPointView extends AbstractStatefulView {
  #rollupButtonElement = null;
  #editFormElement = null;
  #typeGroupElement = null;
  #availableOffersElement = null;
  #priceElement = null;
  #fieldDestination = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #cancelButton = null;

  #onCancelClick = null;
  #onFormSubmit = null;

  constructor({ point, offers, destination, cities, destinations, onCancelClick, onFormSubmit }) {
    super();

    this.cities = cities;
    this.destinations = destinations;

    this._setState({
      point,
      offers,
      destination
    });

    this.#onCancelClick = onCancelClick;
    this.#onFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createFormTemplate(FormConfig.ADD, this.cities, this._state);
  }

  _restoreHandlers = () => {
    this.#editFormElement = this.element.querySelector('.event.event--edit');
    this.#typeGroupElement = this.element.querySelector('.event__type-group');
    this.#availableOffersElement = this.element.querySelector('.event__available-offers');
    this.#priceElement = this.element.querySelector('.event__input--price');
    this.#fieldDestination = this.element.querySelector('.event__input--destination');
    this.#cancelButton = this.element.querySelector('.event__reset-btn');

    this.#editFormElement.addEventListener('submit', this.#formSubmitHandler);
    this.#typeGroupElement.addEventListener('change', this.#typeGroupChangeHandler);

    if (this.#availableOffersElement) {
      this.#availableOffersElement.addEventListener('change', this.#availableOffersChangeHandler);
    }

    this.#priceElement.addEventListener('input', this.#priceInputHandler);
    this.#fieldDestination.addEventListener('change', this.#fieldDestinationChangeHandler);

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
    }
    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
    }

    this.#setDatepicker();

    this.#cancelButton.addEventListener('click', this.#cancelButtonClickHandler);
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #setDatepicker = () => {
    const configDatePicker = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
    };

    this.#datepickerStart = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        ...configDatePicker,
        defaultDate: this._state.point.dateFrom,
        onChange: this.#dateStartChangeHandler,
        maxDate: this._state.point.dateTo
      }
    );

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        ...configDatePicker,
        defaultDate: this._state.point.dateTo,
        onChange: this.#dateEndChangeHandler,
        minDate: this._state.point.dateFrom
      }
    );
  };

  #dateStartChangeHandler = ([date]) => {
    this._setState({
      point: { ...this._state.point, dateFrom: date }
    });
    this.#datepickerEnd.set('minDate', date);
  };

  #dateEndChangeHandler = ([date]) => {
    this._setState({
      point: { ...this._state.point, dateTo: date }
    });
    this.#datepickerStart.set('maxDate', date);
  };

  #typeGroupChangeHandler = (evt) => {
    const target = evt.target;
    if (!target.closest('.event__type-input')) {
      return;
    }

    const typeOffers = this._state.offers.allOffers.find((offer) => offer.type === target.value);
    if (!typeOffers) {
      return;
    }

    const allTypeOffers = typeOffers.offers;
    const selectedOffers = allTypeOffers.filter((offer) => this._state.point.offers.includes(offer.id));

    this.updateElement({
      point: { ...this._state.point, type: target.value },
      offers: {
        ...this._state.offers,
        pointOffers: { allTypeOffers, selectedOffers }
      }
    });
  };

  #availableOffersChangeHandler = (evt) => {
    const target = evt.target;
    if (!target.closest('.event__offer-checkbox')) {
      return;
    }

    const offerId = target.dataset.offerId;
    const allTypeOffers = this._state.offers.allOffers
      .find((offer) => offer.type === this._state.point.type)?.offers ?? [];
    const currentSelected = this._state.offers.pointOffers.selectedOffers;

    let newPointOffers;
    let newSelectedOffers;

    if (target.checked) {
      newPointOffers = [...this._state.point.offers, offerId];
      const offer = allTypeOffers.find((o) => o.id === offerId);
      newSelectedOffers = offer ? [...currentSelected, offer] : currentSelected;
    } else {
      newPointOffers = this._state.point.offers.filter((id) => id !== offerId);
      newSelectedOffers = currentSelected.filter((offer) => offer.id !== offerId);
    }

    this._setState({
      point: { ...this._state.point, offers: newPointOffers },
      offers: {
        ...this._state.offers,
        pointOffers: { ...this._state.offers.pointOffers, selectedOffers: newSelectedOffers }
      }
    });
  };

  #priceInputHandler = (evt) => {
    const cleanedPrice = evt.target.value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    if (evt.target.value !== cleanedPrice) {
      evt.target.value = cleanedPrice;
    }
    const newBasePrice = cleanedPrice === '' ? '' : Number(cleanedPrice);
    this._setState({
      point: { ...this._state.point, basePrice: newBasePrice }
    });
  };

  #fieldDestinationChangeHandler = (evt) => {
    const currentValue = evt.target.value;
    const isValid = this.cities.includes(currentValue);

    if (isValid) {
      const newDestination = this.destinations.find((destination) => destination.name === currentValue);
      this.updateElement({
        point: { ...this._state.point, destination: newDestination.id },
        destination: newDestination
      });
    } else {
      this.updateElement({
        point: { ...this._state.point, destination: '' },
        destination: {}
      });
    }
  };

  #cancelButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onCancelClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(this._state.point);
  };

  #handleEscKeyDown = (evt) => {
    if (isEscape(evt.key)) {
      this.#onCancelClick();
    }
  };
}
