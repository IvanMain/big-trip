import { render, replace } from '../framework/render';
import PageMainView from '../view/common/page-main-view';
import TripEventsView from '../view/events/trip-events-view';
import SortView from '../view/filters/sort-view';
import EventListView from '../view/events/event-list-view';
import EditPointView from '../view/form/edit-point-view';
import AddPointView from '../view/form/add-point-view';
import EventListItemView from '../view/events/event-list-item-view';
import { FormConfig } from '../configs/form-config';
import { isEscape } from '../utils/common';

export default class MainPresenter {
  #pageMainComponent = new PageMainView();
  #tripEventsComponent = new TripEventsView();
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  #eventListItemComponents = new Map();
  #editPointComponents = new Map();

  #tripEventsElement = null;
  #eventListElement = null;
  #pageMainContainerElement = null;

  #activeEditFormId = false;
  #isEditActiveForm = null;

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.points = [...this.pointsModel.get()];

    render(this.#pageMainComponent, this.container);

    this.#pageMainContainerElement = this.#pageMainComponent.element.querySelector('.page-body__container');

    render(this.#tripEventsComponent, this.#pageMainContainerElement);

    this.#tripEventsElement = this.#tripEventsComponent.element;
    this.#eventListElement = this.#eventListComponent.element;

    render(this.#sortComponent, this.#tripEventsElement);
    render(this.#eventListComponent, this.#tripEventsElement);

    this.points.forEach((point) => this.#renderPoint(point));
  }

  #getPointData({ point, onEditToggle }) {
    return {
      point,
      offers: this.offersModel.getOffersByPoint(point),
      destination: this.destinationsModel.getDestinationByID(point.destination),
      onEditToggle
    };
  }

  #getAddPointData() {
    return {
      point: FormConfig.ADD.data.point,
      offers: this.offersModel.getOffersByType(FormConfig.ADD.data.point.type),
    };
  }

  #getComponents(pointId) {
    return {
      listItem: this.#eventListItemComponents.get(pointId),
      editForm: this.#editPointComponents.get(pointId)
    };
  }

  #onEscKeyDown = (evt) => {
    if (isEscape(evt.key)) {
      this.#onEditFormSubmit(this.#activeEditFormId);
    }
  };

  #onRollupButtonClick = (pointId) => {
    const { listItem, editForm } = this.#getComponents(pointId);

    if (listItem && editForm) {
      this.#activeEditFormId = pointId;

      document.addEventListener('keydown', this.#onEscKeyDown);

      replace(editForm, listItem);
    }
  };

  #onEditFormSubmit = (pointId) => {
    const { listItem, editForm } = this.#getComponents(pointId);

    if (listItem && editForm) {
      this.#removeEscapeListener();
      replace(listItem, editForm);
    }
  };

  #removeEscapeListener = () => {
    document.removeEventListener('keydown', this.#onEscKeyDown);

    this.#activeEditFormId = null;
    this.#isEditActiveForm = false;
  };

  #renderPoint(point) {
    const pointId = point.id;

    const eventListItemComponent = new EventListItemView(
      this.#getPointData({
        point,
        onEditToggle: () => {
          this.#onRollupButtonClick(pointId);
        }
      })
    );

    const editPointComponent = new EditPointView(
      this.#getPointData({
        point,
        onEditToggle: () => {
          this.#onEditFormSubmit(pointId);
        }
      })
    );

    this.#eventListItemComponents.set(pointId, eventListItemComponent);
    this.#editPointComponents.set(pointId, editPointComponent);
    // new AddPointView(this.#getAddPointData())
    render(eventListItemComponent, this.#eventListElement);
  }
}
