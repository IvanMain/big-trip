import { render } from '../framework/render.js';
import PageHeaderView from '../view/header/page-header-view.js';
import TripInfoView from '../view/header/trip-info-view.js';
import NewEventButtonView from '../view/header/new-event-button-view.js';

export default class HeaderPresenter {
  #pageHeaderComponent = new PageHeaderView();
  #tripInfoComponent = new TripInfoView();

  #newEventButtonComponent = null;

  #tripMainElement = null;

  constructor({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.get()];

    render(this.#pageHeaderComponent, this.container);
    this.#tripMainElement = this.#pageHeaderComponent.element.querySelector('.trip-main');

    this.#renderTripInfo();
    this.#renderNewEventButton();
  }

  #renderTripInfo() {
    if (this.points.length) {
      render(this.#tripInfoComponent, this.#tripMainElement);
    }
  }

  #renderNewEventButton() {
    const isDisabled = !this.points.length;

    this.#newEventButtonComponent = new NewEventButtonView({ isDisabled });
    render(this.#newEventButtonComponent, this.#tripMainElement);
  }
}
