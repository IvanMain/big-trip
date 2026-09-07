import { render } from '../framework/render';
import { updateData } from '../utils/common';
import { FormConfig } from '../configs/form-config';
import HeaderPresenter from './header-presenter';
import PointPresenter from './point-presenter';
import PageMainView from '../view/common/page-main-view';
import TripEventsView from '../view/events/trip-events-view';
import SortView from '../view/filters/sort-view';
import EventListView from '../view/events/event-list-view';
// import AddPointView from '../view/form/add-point-view';
import EmptyView from '../view/notifications/empty-view';

export default class MainPresenter {
  #pageMainComponent = new PageMainView();
  #tripEventsComponent = new TripEventsView();
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #emptyComponent = new EmptyView();

  #eventListItemComponents = new Map();
  #editPointComponents = new Map();

  #mainPresenterPoints = new Map();

  #tripEventsElement = null;
  #eventListElement = null;
  #pageMainContainerElement = null;

  #activeEditForms = new Map();

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.points = [...this.pointsModel.get()];

    this.#renderHeader();
    this.#renderBody();
    this.#renderPoints();
  }

  #renderHeader() {
    const headerPresenter = new HeaderPresenter({
      container: this.container,
      pointsModel: this.pointsModel
    });

    headerPresenter.init();
  }

  #renderBody() {
    render(this.#pageMainComponent, this.container);

    this.#pageMainContainerElement = this.#pageMainComponent.element.querySelector('.page-body__container');

    render(this.#tripEventsComponent, this.#pageMainContainerElement);

    this.#tripEventsElement = this.#tripEventsComponent.element;
    this.#eventListElement = this.#eventListComponent.element;
  }

  #renderPoints() {
    if (!this.points.length) {
      render(this.#emptyComponent, this.#tripEventsElement);
      return;
    }

    render(this.#sortComponent, this.#tripEventsElement);
    render(this.#eventListComponent, this.#tripEventsElement);

    this.points.forEach(this.#renderPoint);
  }

  #getAddPointData() {
    return {
      point: FormConfig.ADD.data.point,
      offers: this.offersModel.getOffersByType(FormConfig.ADD.data.point.type),
    };
    // new AddPointView(this.#getAddPointData());
  }

  #onPointDataChange = (point) => {
    this.points = updateData(this.points, point);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      offersModel: this.offersModel,
      destinationsModel: this.destinationsModel,
      eventListItemComponents: this.#eventListItemComponents,
      editPointComponents: this.#editPointComponents,
      eventListElement: this.#eventListElement,
      onPointDataChange: this.#onPointDataChange,
      activeEditForms: this.#activeEditForms
    });

    this.#mainPresenterPoints.set(point.id, pointPresenter);

    pointPresenter.init(point);
  };
}
