import { createElement } from '../../util/render';

const createWayTemplate = () => `
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>

    <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>
  </div>
`;

const createCostTemplate = () => `
  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>
`;

const createTripInfoTemplate = () => `
  <section class="trip-main__trip-info  trip-info">
    ${createWayTemplate()}
    ${createCostTemplate()}
  </section>
`;

export default class TripInfoView {
  getTemplate() {
    return createTripInfoTemplate();
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
