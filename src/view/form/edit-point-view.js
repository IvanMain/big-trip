import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { FormConfig } from '../../configs/form-config.js';
import { createFormTemplate } from '../templates/create-form-template.js';

export default class EditPointView extends AbstractStatefulView {
  #rollupButtonElement = null;
  #editFormElement = null;
  #typeGroupElement = null;
  #availableOffersElement = null;
  #priceElement = null;
  #fieldDestination = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  #defaultEditPointState = null;
  #onEditToggle = null;

  constructor({ point, offers, destinations, destination, cities, onEditToggle }) {
    super();

    this.cities = cities;
    this.destinations = destinations;

    this.#defaultEditPointState = {
      point,
      offers,
      destination
    };

    this._setState({
      point,
      offers,
      destination
    });

    this.#onEditToggle = onEditToggle;

    this._restoreHandlers();
  }

  get template() {
    return createFormTemplate(FormConfig.EDIT, this.cities, this._state);
  }

  reset({ point, offers, destination }) {
    this.updateElement({
      point,
      offers,
      destination
    });
  }

  _restoreHandlers = () => {
    this.#rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    this.#editFormElement = this.element.querySelector('.event.event--edit');
    this.#typeGroupElement = this.element.querySelector('.event__type-group');
    this.#availableOffersElement = this.element.querySelector('.event__available-offers');
    this.#priceElement = this.element.querySelector('.event__input--price');
    this.#fieldDestination = this.element.querySelector('.event__input--destination');

    this.#rollupButtonElement.addEventListener('click', this.#formRollupClickHandler);
    this.#editFormElement.addEventListener('submit', this.#formSubmitHandler);
    this.#typeGroupElement.addEventListener('change', this.#typeGroupChangeHandler);

    if (this.#availableOffersElement) {
      this.#availableOffersElement.addEventListener('change', this.#availableOffersChangeHandler);
    }

    this.#priceElement.addEventListener('input', this.#priceInputHandler);
    this.#fieldDestination.addEventListener('change', this.#fieldDestinationChangeHandler);

    this.#setDatepicker();
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
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: date
      }
    });

    this.#datepickerEnd.set('minDate', date);
  };

  #dateEndChangeHandler = ([date]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateTo: date
      }
    });

    this.#datepickerStart.set('maxDate', date);
  };

  #formRollupClickHandler = (evt) => {
    evt.preventDefault();

    this.reset(this.#defaultEditPointState);
    this.#onEditToggle();
  };

  #typeGroupChangeHandler = (evt) => {
    const target = evt.target;

    if (target.closest('.event__type-input')) {
      const allTypeOffers = this._state.offers.allOffers.find((offer) => offer.type === target.value).offers;
      const selectedOffers = allTypeOffers.filter((offer) => this._state.point.offers.includes(offer.id));

      this.updateElement({
        point: {
          ...this._state.point,
          type: target.value
        },
        offers: {
          ...this._state.offers,
          pointOffers: {
            allTypeOffers,
            selectedOffers
          }
        }
      });
    }
  };

  #availableOffersChangeHandler = (evt) => {
    const target = evt.target;
    const offerId = target.dataset.offerId;

    if (target.closest('.event__offer-checkbox')) {
      const allTypeOffers = this._state.offers.allOffers.find((offer) => offer.type === this._state.point.type).offers;

      if (target.checked) {
        this._setState({
          point: {
            ...this._state.point,
            offers: [
              ...this._state.point.offers,
              offerId,
            ],
          },
          offers: {
            ...this._state.offers,
            pointOffers: {
              ...this._state.offers.pointOffers,
              selectedOffers: [...this._state.offers.pointOffers.selectedOffers, ...allTypeOffers.filter((offer) => offer.id === offerId)]
            }
          }
        });
      } else {
        this._setState({
          point: {
            ...this._state.point,
            offers: this._state.point.offers.filter((id) => id !== offerId),
          },
          offers: {
            ...this._state.offers,
            pointOffers: {
              ...this._state.offers.pointOffers,
              selectedOffers: [...this._state.offers.pointOffers.selectedOffers.filter((offer) => offer.id !== offerId)]
            }
          }
        });
      }
    }
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();

    const cleanedPrice = evt.target.value.replace(/\D/g, '').replace(/^0+/, '');
    const isValidPrice = /^[1-9]\d*$/.test(cleanedPrice);

    evt.target.value = cleanedPrice;

    if (isValidPrice) {
      this._setState({
        point: {
          ...this._state.point,
          basePrice: Number(cleanedPrice)
        }
      });
    } else {
      this.updateElement({
        point: {
          ...this._state.point,
          basePrice: 1
        }
      });
    }
  };

  #fieldDestinationChangeHandler = (evt) => {
    const currentValue = evt.target.value;
    const isValid = this.cities.includes(currentValue);

    if (isValid) {
      const newDestination = this.destinations.find((destination) => destination.name === currentValue);
      const newDestinationID = this.destinations.filter((destination) => destination.name === currentValue).id;

      this.updateElement({
        point: {
          ...this._state.point,
          destination: newDestinationID
        },
        destination: newDestination
      });
    } else {
      this.updateElement({
        point: {
          ...this._state.point,
          destination: ''
        },
        destination: {}
      });
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this.#onEditToggle();
  };
}
