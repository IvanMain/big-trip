import { SortType } from '../constants/enum';
import { render } from '../framework/render';
import SortBuilder from '../utils/sort-builder';
import SortView from '../view/filters/sort-view';

export default class SortPresenter {
  #currentSortType = SortType.DAY;
  #sortComponent = null;
  #sortData = null;
  #filteredData = null;
  #tripEventsElement = null;
  #sortViewData = null;

  constructor({
    points,
    container,
    clearPoints,
    renderPoints,
    getAllPoints,
    getFilteredPoints
  }) {
    this.points = points;
    this.container = container;
    this.clearPoints = clearPoints;
    this.renderPoints = renderPoints;

    this.getAllPoints = getAllPoints;
    this.getFilteredPoints = getFilteredPoints;
  }

  init() {
    this.#renderSort(this.points);

    this.#sortComponent.element.addEventListener('change', this.#sortClickHandler);
  }

  reset() {
    const targetFilter = SortType.DAY;

    this.#switchSort(targetFilter);
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
    const target = evt.target;

    if (target.closest('.trip-sort__input')) {
      const targetFilter = target.dataset.type;

      this.#switchSort(targetFilter);
    }
  };

  #switchSort(targetFilter) {
    if (this.#currentSortType === targetFilter) {
      return;
    }

    this.freshPoints = this.getFilteredPoints() ?? this.getAllPoints();

    this.#sortData = new SortBuilder(this.freshPoints).init();
    this.#currentSortType = targetFilter;

    this.#sortComponent.setChecked(targetFilter);
    this.clearPoints();
    this.renderPoints(this.#sortData[this.#currentSortType]);
  }
}
