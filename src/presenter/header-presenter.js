import { render } from '../framework/render';
import PageHeaderView from '../view/header/page-header-view';
import TripInfoView from '../view/header/trip-info-view';
import NewEventButtonView from '../view/header/new-event-button-view';
import FiltersView from '../view/filters/filters-view';
import FilterBuilder from '../utils/filter-builder';

export default class HeaderPresenter {
  #pageHeaderComponent = new PageHeaderView();
  #tripInfoComponent = new TripInfoView();
  #filtersComponent = null;
  #newEventButtonComponent = null;

  #tripMainElement = null;

  constructor({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.get()];

    this.filtersData = new FilterBuilder(this.points).init();

    render(this.#pageHeaderComponent, this.container);
    this.#tripMainElement = this.#pageHeaderComponent.element.querySelector('.trip-main');

    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderNewEventButton();
  }

  #renderTripInfo() {
    if (this.points.length) {
      render(this.#tripInfoComponent, this.#tripMainElement);
    }
  }

  #renderFilters() {
    this.#filtersComponent = new FiltersView({ filtersData: this.filtersData });
    render(this.#filtersComponent, this.#tripMainElement);
  }

  #renderNewEventButton() {
    const isDisabled = !this.points.length;

    this.#newEventButtonComponent = new NewEventButtonView({ isDisabled });
    render(this.#newEventButtonComponent, this.#tripMainElement);
  }
}
