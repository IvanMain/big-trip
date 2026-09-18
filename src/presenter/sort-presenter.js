import { SortType } from '../constants/enum.js';
import { render } from '../framework/render.js';
import SortBuilder from '../utils/sort-builder.js';
import SortView from '../view/filters/sort-view.js';

export default class SortPresenter {
  #currentSortType = SortType.DAY;
  #sortComponent = null;
  #sortData = null;
  #tripEventsElement = null;
  #sortViewData = null;

  constructor({ points, container, onSortChange }) {
    this.points = points;
    this.container = container;
    this.onSortChange = onSortChange;
  }

  get currentSortType() {
    return this.#currentSortType;
  }

  init() {
    this.#renderSort();
    this.#sortComponent.element.addEventListener('change', this.#sortClickHandler);
  }

  getSortedPoints(points) {
    return new SortBuilder(points).init()[this.#currentSortType];
  }

  reset() {
    this.#currentSortType = SortType.DAY;
    this.#sortComponent.setChecked(SortType.DAY);
  }

  #renderSort() {
    this.#sortData = new SortBuilder(this.points).init();

    this.#sortViewData = Object.values(SortType).map((type) => ({
      type,
      isDisabled: !this.#sortData[type]?.length,
      isChecked: this.#currentSortType === type
    }));

    this.#sortComponent = new SortView({
      sortViewData: this.#sortViewData
    });

    this.#tripEventsElement = this.container.querySelector('.trip-events');

    render(this.#sortComponent, this.#tripEventsElement);
  }

  #sortClickHandler = (evt) => {
    const sortInput = evt.target.closest('.trip-sort__input');

    if (!sortInput) {
      return;
    }

    const targetFilter = sortInput.dataset.type;

    if (!targetFilter || this.#currentSortType === targetFilter) {
      return;
    }

    this.#currentSortType = targetFilter;
    this.#sortComponent.setChecked(targetFilter);
    this.onSortChange();
  };
}
