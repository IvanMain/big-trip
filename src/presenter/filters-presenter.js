import { render, RenderPosition } from '../framework/render.js';
import { UpdateType } from '../constants/enum.js';
import FilterBuilder from '../utils/filter-builder.js';
import FiltersView from '../view/filters/filters-view.js';

export default class FiltersPresenter {
  #pointsModel = null;
  #filtersModel = null;
  #container = null;
  #filtersComponent = null;
  #tripInfoElement = null;

  constructor({ pointsModel, filtersModel, container }) {
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#container = container;

    this.#filtersModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#renderFilters(this.#pointsModel.points);
    this.#filtersComponent.element.querySelector('.trip-filters').addEventListener('change', this.#filtersClickHandler);
  }

  getFilteredPoints() {
    const filtersData = new FilterBuilder(this.#pointsModel.points).init();
    return filtersData[this.#filtersModel.filter] ?? null;
  }

  #renderFilters(points) {
    this.#tripInfoElement = this.#container.querySelector('.trip-info');
    const filtersData = new FilterBuilder(points).init();

    this.#filtersComponent = new FiltersView({
      currentFilter: this.#filtersModel.filter,
      filtersData
    });

    render(this.#filtersComponent, this.#tripInfoElement, RenderPosition.AFTEREND);
  }

  #filtersClickHandler = (evt) => {
    const filterInput = evt.target.closest('.trip-filters__filter-input');

    if (!filterInput) {
      return;
    }

    const targetFilter = filterInput.value;

    if (this.#filtersModel.filter === targetFilter) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, targetFilter);
  };

  #handleModelChange = () => {
    this.#filtersComponent?.setChecked(this.#filtersModel.filter);
  };
}
