import { render, RenderPosition } from '../framework/render';
import FilterBuilder from '../utils/filter-builder';
import FiltersView from '../view/filters/filters-view';

export default class FiltersPresenter {
  #filtersComponent = null;
  #filtersData = null;
  #tripInfoElement = null;

  constructor({
    container,
    pointsModel
  }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.get()];
    this.#filtersData = new FilterBuilder(this.points).init();

    this.#tripInfoElement = this.container.querySelector('.trip-info');

    if (this.points.length) {
      this.#renderFilters();
    }
  }

  #renderFilters() {
    this.#filtersComponent = new FiltersView({ filtersData: this.#filtersData });

    render(this.#filtersComponent, this.#tripInfoElement, RenderPosition.AFTEREND);
  }
}
