import { capitalizedWord } from '../../util/word';
import { EVENT_TYPES, CITIES, OFFER_TYPES, GALLERY_ITEMS } from '../../constants/constants';
import { FormConfig } from '../../constants/enum';

const createEventTypeItemTemplate = (type) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">

    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizedWord(type)}</label>
  </div>
`;


const createEventTypeTemplate = () => `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
    </label>

    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        ${EVENT_TYPES.map(createEventTypeItemTemplate).join('')}
      </fieldset>
    </div>
  </div>
`;

const createDestinationListItemTemplate = (item) => `<option value="${item}"></option>`;

const createDestinationFieldTemplate = () => `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      Flight
    </label>

    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">

    <datalist id="destination-list-1">
      ${CITIES.map(createDestinationListItemTemplate).join('')}
    </datalist>
  </div>
`;

const createTimeFieldTemplate = () => `
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
    —
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
  </div>
`;

const createPriceFieldTemplate = () => `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      €
    </label>

    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
  </div>
`;

const createActionButtonsTemplate = ({ isRollupButton, submitTextButton, resetTextButton }) => `
  <button class="event__save-btn  btn  btn--blue" type="submit">${submitTextButton}</button>

  <button class="event__reset-btn" type="reset">${resetTextButton}</button>

  ${isRollupButton ?
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` : ''}
`;

const createOfferItemTemplate = (offerType) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerType.type}-1" type="checkbox" name="event-offer-${offerType.type}">

    <label class="event__offer-label" for="event-offer-${offerType.type}-1">
      <span class="event__offer-title">${offerType.label}</span>
      +€&nbsp;
      <span class="event__offer-price">${offerType.cost}</span>
    </label>
  </div>
`;

const createOffersTemplate = () => `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${OFFER_TYPES.map(createOfferItemTemplate).join('')}
    </div>
  </section>
`;

const createDestinationGalleryItemTemplate = (item) => `<img class="event__photo" src="${item.src}" alt="${item.alt}">`;

const createDestinationGalleryTemplate = () => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${GALLERY_ITEMS.map(createDestinationGalleryItemTemplate).join('')}
    </div>
  </div>
`;

const createDestinationSectionTemplate = ({ showGallery }) => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>

    <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>

    ${showGallery ? createDestinationGalleryTemplate() : ''}
  </section>
`;

const createHeaderSection = ({
  isRollupButton = false,
  submitTextButton = 'Save',
  resetTextButton = 'Delete'
}) => `
  ${createEventTypeTemplate()}
  ${createDestinationFieldTemplate()}
  ${createTimeFieldTemplate()}
  ${createPriceFieldTemplate()}
  ${createActionButtonsTemplate({ isRollupButton, submitTextButton, resetTextButton })}
`;

const createDetailsSection = ({
  showOffers = false,
  showGallery = false
}) => `
  ${showOffers ? createOffersTemplate() : ''}
  ${createDestinationSectionTemplate({ showGallery })}
`;

const createFormTemplate = ({ config = FormConfig.EDIT }) => `
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${createHeaderSection(config)}
    </header>

    <section class="event__details">
      ${createDetailsSection(config)}
    </section>
  </form>
`;

export { createFormTemplate };
