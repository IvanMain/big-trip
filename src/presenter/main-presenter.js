import { render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, FilterType, Message } from '../constants/enum.js';
import HeaderPresenter from './header-presenter.js';
import FiltersPresenter from './filters-presenter.js';
import SortPresenter from './sort-presenter.js';
import PointPresenter from './point-presenter.js';
import PageMainView from '../view/common/page-main-view.js';
import TripEventsView from '../view/events/trip-events-view.js';
import EventListView from '../view/events/event-list-view.js';
import AddPointView from '../view/form/add-point-view.js';
import EmptyView from '../view/notifications/empty-view.js';

export default class MainPresenter {
  #headerPresenter = null;
  #sortPresenter = null;
  #filtersPresenter = null;

  #pageMainComponent = new PageMainView();
  #tripEventsComponent = new TripEventsView();
  #eventListComponent = new EventListView();

  #eventListItemComponents = new Map();
  #editPointComponents = new Map();

  #mainPresenterPoints = new Map();

  #tripEventsElement = null;
  #eventListElement = null;
  #pageMainContainerElement = null;

  #addPointComponent = null;
  #addButtonElement = null;

  constructor({ container, pointsModel, filtersModel, offersModel, destinationsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.filtersModel = filtersModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;

    this.pointsModel.addObserver(this.#onPointsModelEvent);
    this.filtersModel.addObserver(this.#onFilterChange);
  }

  init() {
    this.#renderHeader();
    this.#renderFilters();
    this.#renderBody();
    this.#renderSort();
    this.#updatePoints();

    this.#addButtonElement = this.container.querySelector('.trip-main__event-add-btn');
    this.#addButtonElement?.addEventListener('click', this.#handleAddButtonClick);
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
      pointsModel: this.pointsModel,
      filtersModel: this.filtersModel,
      container: this.container,
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
    const text = this.#getEmptyText(this.filtersModel.filter);
    const emptyComponent = new EmptyView({ text });
    render(emptyComponent, this.#tripEventsElement);
  }

  #getEmptyText(filterType) {
    switch (filterType) {
      case FilterType.FUTURE:
        return Message.NO_FUTURE_FILTERS;
      case FilterType.PRESENT:
        return Message.NO_PRESENT_FILTERS;
      case FilterType.PAST:
        return Message.NO_PAST_FILTERS;
      case FilterType.EVERYTHING:
      default:
        return Message.EMPTY;
    }
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      points: this.pointsModel.points,
      container: this.container,
      onSortChange: this.#updatePoints,
    });
    this.#sortPresenter.init();
  }

  #updatePoints = () => {
    const allPoints = this.pointsModel.points;
    const filtered = this.#filtersPresenter.getFilteredPoints() ?? allPoints;
    const sorted = this.#sortPresenter.getSortedPoints(filtered);

    this.#clearPoints();
    render(this.#eventListComponent, this.#tripEventsElement);

    if (!sorted.length) {
      this.#renderIsEmpty();
      return;
    }

    this.#renderPoints(sorted);
  };

  #renderPoints = (points) => {
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
      onFormClose: this.#closeAllForms,
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

    if (this.#addPointComponent) {
      this.#addPointComponent.element.remove();
      this.#addPointComponent = null;
    }

    const oldEmpty = this.#tripEventsElement.querySelector('.trip-events__msg');
    if (oldEmpty) {
      oldEmpty.remove();
    }

    this.#eventListItemComponents.clear();
    this.#editPointComponents.clear();
    this.#mainPresenterPoints.clear();
  };

  #getBlankPoint() {
    return {
      id: crypto.randomUUID(),
      basePrice: 0,
      type: 'flight',
      destination: '',
      dateFrom: new Date().toISOString(),
      dateTo: new Date().toISOString(),
      offers: [],
      isFavorite: false
    };
  }

  #handleAddButtonClick = () => {
    if (this.#addPointComponent) {
      return;
    }

    this.filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#sortPresenter.reset();

    this.#closeAllForms();
    this.#openAddForm();
  };

  #openAddForm() {
    const blankPoint = this.#getBlankPoint();
    const allOffers = this.offersModel.get();

    this.#addPointComponent = new AddPointView({
      point: blankPoint,
      offers: {
        allOffers,
        pointOffers: {
          allTypeOffers: [],
          selectedOffers: []
        }
      },
      destination: {},
      cities: this.destinationsModel.getCities(),
      destinations: this.destinationsModel.get(),
      onCancelClick: this.#handleAddFormCancel,
      onFormSubmit: this.#handleAddFormSubmit
    });

    render(this.#addPointComponent, this.#eventListElement, RenderPosition.AFTERBEGIN);
  }

  #handleAddFormSubmit = (newPoint) => {
    this.#onPointDataChange(UserAction.ADD, UpdateType.MAJOR, newPoint);
  };

  #handleAddFormCancel = () => {
    if (this.#addPointComponent) {
      this.#addPointComponent.element.remove();
      this.#addPointComponent = null;
    }
  };

  #closeAllForms = () => {
    this.#mainPresenterPoints.forEach((presenter) => presenter.closeForm());
    this.#handleAddFormCancel();
  };

  #onPointDataChange = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE:
        this.pointsModel.updatePoint(updateType, update);
        break;

      case UserAction.ADD:
        this.pointsModel.addPoint(updateType, update);
        break;

      case UserAction.DELETE:
        this.pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #onFilterChange = () => {
    this.#sortPresenter.reset();
    this.#updatePoints();
  };

  #onPointsModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#mainPresenterPoints.get(data.id)?.init(data);
        break;

      case UpdateType.MAJOR:
        this.#updatePoints();
        break;
    }
  };
}
