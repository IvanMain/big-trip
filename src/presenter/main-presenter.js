import { render } from '../framework/render';
import { updateData } from '../utils/common';
import { FormConfig } from '../configs/form-config';
import HeaderPresenter from './header-presenter';
import FiltersPresenter from './filters-presenter';
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
    const headerPresenter = new HeaderPresenter({
      container: this.container,
      pointsModel: this.pointsModel
    });

    headerPresenter.init();
  }

  #renderFilters() {
    const filtersPresenter = new FiltersPresenter({
      points: this.points,
      container: this.container,
      clearPoints: this.#clearPoints,
      renderPoints: this.#renderPoints,
      getFreshPoints: this.#getFreshPoints
    });

    filtersPresenter.init();
  }

  #getFreshPoints = () => this.points;

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
    render(this.#sortComponent, this.#tripEventsElement);
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

  #getAddPointData() {
    return {
      point: FormConfig.ADD.data.point,
      offers: this.offersModel.getOffersByType(FormConfig.ADD.data.point.type),
    };
    // new AddPointView(this.#getAddPointData());
  }

  #onPointDataChange = (updatedPoint) => {
    this.points = updateData(this.points, updatedPoint);

    this.#mainPresenterPoints.get(updatedPoint.id).init(updatedPoint);
  };
}
