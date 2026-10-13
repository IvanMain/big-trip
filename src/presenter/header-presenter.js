import { render } from '../framework/render.js';
import { UpdateType } from '../constants/enum.js';
import PageHeaderView from '../view/header/page-header-view.js';
import TripInfoView from '../view/header/trip-info-view.js';
import NewEventButtonView from '../view/header/new-event-button-view.js';

export default class HeaderPresenter {
  #pointsModel = null;

  #pageHeaderComponent = new PageHeaderView();
  #tripInfoComponent = null;
  #newEventButtonComponent = null;

  #tripMainElement = null;

  constructor({ container, pointsModel }) {
    this.container = container;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  init() {
    render(this.#pageHeaderComponent, this.container);
    this.#tripMainElement = this.#pageHeaderComponent.element.querySelector('.trip-main');

    this.#renderTripInfo();
    this.#renderNewEventButton();
  }

  #renderTripInfo() {
    if (!this.#pointsModel.points.length) {
      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      totalCost: this.#getTotalCost(),
    });

    render(this.#tripInfoComponent, this.#tripMainElement);
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewEventButtonView({ isDisabled: false });
    render(this.#newEventButtonComponent, this.#tripMainElement);
  }

  #getTotalCost() {
    return this.#pointsModel.points.reduce((sum, point) => sum + point.basePrice, 0);
  }

  #handleModelChange = (updateType) => {
    if (updateType === UpdateType.PATCH || updateType === UpdateType.MAJOR) {
      if (!this.#tripInfoComponent) {
        this.#renderTripInfo();
        return;
      }

      this.#tripInfoComponent.updateData({
        totalCost: this.#getTotalCost(),
      });
    }
  };
}
