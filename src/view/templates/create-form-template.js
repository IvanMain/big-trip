import { capitalizedWord } from '../../utils/word';
import { isEmptyObject } from '../../utils/common';
import { EVENT_TYPES, CITIES } from '../../constants/constants';
import { FormConfig } from '../../configs/form-config';
import DayBuilder from '../../utils/day-builder';

const createEventTypeItemTemplate = (type, currentType) => {
  const isChecked = type === currentType ? 'checked' : '';

  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>

      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizedWord(type)}</label>
    </div>
  `;
};

const createEventTypeTemplate = (point) => {
  const { type: currentType } = point;

  return `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${currentType}.png" alt="Event ${currentType} icon">
      </label>

      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${EVENT_TYPES.map((eventType) => createEventTypeItemTemplate(eventType, currentType)).join('')}
        </fieldset>
      </div>
    </div>
  `;
};

const createDestinationListItemTemplate = (item) => `<option value="${item}"></option>`;

const createDestinationFieldTemplate = (point, destination) => {
  const { type } = point;
  const { name } = destination;

  return `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${capitalizedWord(type)}
      </label>

      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${capitalizedWord(name)}" list="destination-list-1">

      <datalist id="destination-list-1">
        ${CITIES.map(createDestinationListItemTemplate).join('')}
      </datalist>
    </div>
  `;
};

const createTimeFieldTemplate = (point) => {
  const { dateFrom, dateTo } = point;

  return `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
        value="${dateFrom ? DayBuilder.getCalendarFormat(dateFrom) : ''}">
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
        value="${dateTo ? DayBuilder.getCalendarFormat(dateTo) : ''}">
    </div>
  `;
};

const createPriceFieldTemplate = (point) => {
  const { basePrice } = point;

  return `
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>

      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>
  `;
};

const createActionButtonsTemplate = (isRollupButton, submitTextButton, resetTextButton) => `
  <button class="event__save-btn  btn  btn--blue" type="submit">${submitTextButton}</button>

  <button class="event__reset-btn" type="reset">${resetTextButton}</button>

  ${isRollupButton ?
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` : ''}
`;

const createOfferItemTemplate = (type, typeOffer, selectedOffers) => {
  const { id, price, title } = typeOffer;
  const isChecked = selectedOffers.some((selectedOffer) => selectedOffer.id === id) ? 'checked' : '';

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${isChecked}>

      <label class="event__offer-label" for="event-offer-${type}-${id}">
        <span class="event__offer-title">${title}</span>
        +€&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const createOffersTemplate = (offers) => {
  const { type, allTypeOffers = [], selectedOffers = [] } = offers;

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${allTypeOffers.map((typeOffer) => createOfferItemTemplate(type, typeOffer, selectedOffers)).join('')}
      </div>
    </section>
  `;
};

const createDestinationGalleryItemTemplate = (picture) => {
  const { src, description } = picture;

  return `<img class="event__photo" src="${src}" alt="${description}">`;
};

const createDestinationGalleryTemplate = (pictures) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(createDestinationGalleryItemTemplate).join('')}
    </div>
  </div>
`;

const createDestinationSectionTemplate = (destination) => {
  const { name, description, pictures = [] } = destination;

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">${name}</h3>

      <p class="event__destination-description">${description}</p>

      ${pictures.length ? createDestinationGalleryTemplate(pictures) : ''}
    </section>
  `;
};

const createFormHeader = (config, point, destination) => {
  const {
    isRollupButton = false,
    submitTextButton = 'Save',
    resetTextButton = 'Delete'
  } = config;


  return `
    ${createEventTypeTemplate(point)}
    ${createDestinationFieldTemplate(point, destination)}
    ${createTimeFieldTemplate(point)}
    ${createPriceFieldTemplate(point)}
    ${createActionButtonsTemplate(isRollupButton, submitTextButton, resetTextButton)}
  `;
};

const createFormDetails = (offers, destination) => `
    ${!isEmptyObject(offers) ? createOffersTemplate(offers) : ''}
    ${!isEmptyObject(destination) ? createDestinationSectionTemplate(destination) : ''}
`;

const createFormTemplate = ({
  config = FormConfig.EDIT,
  point = {},
  offers = {},
  destination = {}
}) => `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createFormHeader(config, point, destination)}
      </header>

      <section class="event__details">
        ${createFormDetails(offers, destination)}
      </section>
    </form>
  </li>
  `;

export { createFormTemplate };
