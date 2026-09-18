import { FilterType } from '../constants/enum.js';
import { render, RenderPosition } from '../framework/render.js';
import FilterBuilder from '../utils/filter-builder.js';
import FiltersView from '../view/filters/filters-view.js';

export default class FiltersPresenter {
  #currentFilter = FilterType.EVERYTHING;
  #filtersComponent = null;
  #filtersData = null;
  #tripInfoElement = null;

  constructor({ points, container, onFilterChange }) {
    this.points = points;
    this.container = container;
    this.onFilterChange = onFilterChange;
  }

  init() {
    if (!this.points.length) {
      return;
    }

    this.#renderFilters(this.points);
    this.#filtersComponent.element.querySelector('.trip-filters').addEventListener('change', this.#filtersClickHandler);
  }

  getFilteredPoints() {
    const filtersData = new FilterBuilder(this.points).init();
    return filtersData[this.#currentFilter] ?? null;
  }

  #renderFilters(points) {
    this.#tripInfoElement = this.container.querySelector('.trip-info');
    this.#filtersData = new FilterBuilder(points).init();

    this.#filtersComponent = new FiltersView({
      currentFilter: this.#currentFilter,
      filtersData: this.#filtersData
    });

    render(this.#filtersComponent, this.#tripInfoElement, RenderPosition.AFTEREND);
  }

  #filtersClickHandler = (evt) => {
    const filterInput = evt.target.closest('.trip-filters__filter-input');

    if (!filterInput) {
      return;
    }

    const targetFilter = filterInput.value;

    if (this.#currentFilter === targetFilter) {
      return;
    }

    this.#currentFilter = targetFilter;
    this.#filtersComponent.setChecked(targetFilter);
    this.onFilterChange();
  };
}
