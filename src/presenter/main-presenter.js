import { render } from '../framework/render.js';
import { updateData } from '../utils/common.js';
import { FormConfig } from '../configs/form-config.js';
import HeaderPresenter from './header-presenter.js';
import FiltersPresenter from './filters-presenter.js';
import SortPresenter from './sort-presenter.js';
import PointPresenter from './point-presenter.js';
import PageMainView from '../view/common/page-main-view.js';
import TripEventsView from '../view/events/trip-events-view.js';
import EventListView from '../view/events/event-list-view.js';
// import AddPointView from '../view/form/add-point-view.js';
import EmptyView from '../view/notifications/empty-view.js';

export default class MainPresenter {
  #headerPresenter = null;
  #sortPresenter = null;
  #filtersPresenter = null;

  #pageMainComponent = new PageMainView();
  #tripEventsComponent = new TripEventsView();
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
    this.#renderFilters();
    this.#renderBody();

    if (!this.points.length) {
      this.#renderIsEmpty();
      return;
    }

    this.#renderSort();
    this.#renderPoints(this.points);
  }

  #renderHeader() {
    this.#headerPresenter = new HeaderPresenter({
      container: this.container,
      pointsModel: this.pointsModel
    });

    this.#headerPresenter.init();
  }

  #renderFilters() {
    this.#filtersPresenter = new FiltersPresenter({
      points: this.points,
      container: this.container,
      clearPoints: this.#clearPoints,
      renderPoints: this.#renderPoints,
      resetSort: this.#resetSort,
      getAllPoints: this.#getAllPoints,
    });

    this.#filtersPresenter.init();
  }

  #renderBody() {
    render(this.#pageMainComponent, this.container);

    this.#pageMainContainerElement = this.#pageMainComponent.element.querySelector('.page-body__container');

    render(this.#tripEventsComponent, this.#pageMainContainerElement);

    this.#tripEventsElement = this.#tripEventsComponent.element;
    this.#eventListElement = this.#eventListComponent.element;
  }

  #renderIsEmpty() {
    render(this.#emptyComponent, this.#tripEventsElement);
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      points: this.points,
      container: this.container,
      clearPoints: this.#clearPoints,
      renderPoints: this.#renderPoints,
      getAllPoints: this.#getAllPoints,
      getFilteredPoints: this.#getFilteredPoints,
    });

    this.#sortPresenter.init();
  }

  #renderPoints = (points) => {
    render(this.#eventListComponent, this.#tripEventsElement);

    points.forEach(this.#renderPoint);
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

  #clearPoints = () => {
    this.#mainPresenterPoints.forEach((presenter) => {
      presenter.closeForm?.();
    });

    this.#eventListItemComponents.forEach(({ element }) => element.remove());
    this.#editPointComponents.forEach(({ element }) => element.remove());

    this.#eventListItemComponents.clear();
    this.#editPointComponents.clear();
    this.#mainPresenterPoints.clear();
    this.#activeEditForms.clear();
  };

  #resetSort = () => {
    this.#sortPresenter.reset();
  };

  #getFilteredPoints = () => this.#filtersPresenter.getFilteredPoints();

  #getAddPointData() {
    return {
      point: FormConfig.ADD.data.point,
      offers: this.offersModel.getOffersByType(FormConfig.ADD.data.point.type),
    };
    // new AddPointView(this.#getAddPointData());
  }

  #getAllPoints = () => this.points;

  #onPointDataChange = (updatedPoint) => {
    this.points = updateData(this.points, updatedPoint);

    this.#mainPresenterPoints.get(updatedPoint.id).init(updatedPoint);
  };
}
