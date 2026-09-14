import AbstractView from '../../framework/view/abstract-view.js';

const createFilterItemTemplate = ({ currentFilter, type, points }) => `
  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"
    ${!points.length ? 'disabled' : ''} ${currentFilter === type ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>
`;

const createFiltersTemplate = ({ currentFilter, filtersData }) => `
  <div class="trip-main__trip-controls  trip-controls">
    <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>

      <form class="trip-filters" action="#" method="get">
        ${Object.entries(filtersData).map(([type, points]) => createFilterItemTemplate({ currentFilter, type, points })).join('')}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  </div>
`;

export default class FiltersView extends AbstractView {
  constructor({
    currentFilter,
    filtersData
  }) {
    super();

    this.currentFilter = currentFilter;
    this.filtersData = filtersData;
  }

  get template() {
    return createFiltersTemplate({
      currentFilter: this.currentFilter,
      filtersData: this.filtersData
    });
  }
}
