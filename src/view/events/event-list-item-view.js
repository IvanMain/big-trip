import AbstractView from '../../framework/view/abstract-view.js';
import DayBuilder from '../../utils/day-builder.js';
import { capitalizedWord } from '../../utils/word.js';

const createEventDateTemplate = (dateFrom) => `<time class="event__date" datetime="${DayBuilder.getShortDate(dateFrom)}">${DayBuilder.getDay(dateFrom)}</time>`;

const createEventTypeTemplate = (type) => `
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
  </div>
`;

const createEventTitleTemplate = (type, city) => `<h3 class="event__title">${capitalizedWord(type)} ${capitalizedWord(city)}</h3>`;

const createEventScheduleTemplate = (dateFrom, dateTo) => `
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${DayBuilder.get(dateFrom)}">${DayBuilder.getHoursWithMinutes(dateFrom)}</time>
      —
      <time class="event__end-time" datetime="${DayBuilder.get(dateTo)}">${DayBuilder.getHoursWithMinutes(dateTo)}</time>
    </p>
    <p class="event__duration">${DayBuilder.getDuration(dateFrom, dateTo)}</p>
  </div>
`;

const createEventPriceTemplate = (basePrice) => `<p class="event__price"> €&nbsp;<span class="event__price-value">${basePrice}</span> </p>`;

const createOfferItemTemplate = (offer) => {
  const { title, price } = offer;

  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      +€&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
`;
};

const createEventOffersTemplate = (offers) => {
  const { selectedOffers } = offers;

  return `
    <h4 class="visually-hidden">Offers:</h4>

    <ul class="event__selected-offers">
      ${selectedOffers.map(createOfferItemTemplate).join('')}
    </ul>
  `;
};

const createEventFavoriteTemplate = (isFavorite) => `
  <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
    </svg>
  </button>
`;

const createEventRollupButtonTemplate = () => `
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
`;

const createEventListItemTemplate = ({ point, offers, destination }) => {
  const { type, basePrice, isFavorite, dateFrom, dateTo } = point;

  const { name: city } = destination;

  return `
    <li class="trip-events__item">
      <div class="event">
        ${createEventDateTemplate(dateFrom)}
        ${createEventTypeTemplate(type)}
        ${createEventTitleTemplate(type, city)}
        ${createEventScheduleTemplate(dateFrom, dateTo)}
        ${createEventPriceTemplate(basePrice)}
        ${createEventOffersTemplate(offers)}
        ${createEventFavoriteTemplate(isFavorite)}
        ${createEventRollupButtonTemplate()}
      </div>
  </li>
  `;
};

export default class EventListItemView extends AbstractView {
  #rollupButtonElement = null;
  #favoriteButtonElement = null;
  #onEditToggle = null;

  #onFavoriteButtonClick = null;

  constructor({ point = {}, offers = {}, destination = {}, onEditToggle, onFavoriteButtonClick }) {
    super();
    this.point = point;
    this.offers = offers.pointOffers;
    this.destination = destination;

    this.#onEditToggle = onEditToggle;
    this.#onFavoriteButtonClick = onFavoriteButtonClick;

    this.#rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    this.#favoriteButtonElement = this.element.querySelector('.event__favorite-btn');

    this.#rollupButtonElement.addEventListener('click', this.#rollupButtonClickHandler);
    this.#favoriteButtonElement.addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template() {
    return createEventListItemTemplate({
      point: this.point,
      offers: this.offers,
      destination: this.destination
    });
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.#onEditToggle();
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.#onFavoriteButtonClick(this.point);
  };
}
