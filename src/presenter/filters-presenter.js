import { FilterType } from '../constants/enum';
import { render, RenderPosition } from '../framework/render';
import FilterBuilder from '../utils/filter-builder';
import FiltersView from '../view/filters/filters-view';

export default class FiltersPresenter {
  #currentFilter = FilterType.EVERYTHING;
  #filtersComponent = null;
  #filtersData = null;
  #tripInfoElement = null;

  constructor({
    points,
    container,
    clearPoints,
    renderPoints,
    getFreshPoints
  }) {
    this.points = points;
    this.container = container;
    this.clearPoints = clearPoints;
    this.renderPoints = renderPoints;

    this.getFreshPoints = getFreshPoints;
  }

  init() {
    if (!this.points.length) {
      return;
    }

    this.#renderFilters(this.points);
    this.#filtersComponent.element.querySelector('.trip-filters').addEventListener('change', this.#filtersClickHandler);
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
    const target = evt.target;

    if (target.closest('.trip-filters__filter-input')) {
      const targetFilter = target.value;

      if (this.#currentFilter === targetFilter) {
        return;
      }

      this.freshPoints = this.getFreshPoints();

      this.#filtersData = new FilterBuilder(this.freshPoints).init();

      this.#currentFilter = targetFilter;

      this.clearPoints();
      this.renderPoints(this.#filtersData[targetFilter]);
    }
  };
}
