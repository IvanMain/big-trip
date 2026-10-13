import AbstractView from '../../framework/view/abstract-view.js';

const createWayTemplate = () => `
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>

    <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>
  </div>
`;

const createCostTemplate = (totalCost) => `
  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>
`;

const createTripInfoTemplate = ({ totalCost }) => `
  <section class="trip-main__trip-info  trip-info">
    ${createWayTemplate()}
    ${createCostTemplate(totalCost)}
  </section>
`;

export default class TripInfoView extends AbstractView {
  #totalCost = 0;

  constructor({ totalCost }) {
    super();
    this.#totalCost = totalCost;
  }

  get template() {
    return createTripInfoTemplate({ totalCost: this.#totalCost });
  }

  updateData(newData) {
    this.#totalCost = newData.totalCost;
    this.element.querySelector('.trip-info__cost-value').textContent = this.#totalCost;
  }
}
