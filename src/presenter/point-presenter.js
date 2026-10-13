import { render, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../constants/enum.js';
import { isEscape } from '../utils/common.js';
import EventListItemView from '../view/events/event-list-item-view.js';
import EditPointView from '../view/form/edit-point-view.js';

export default class PointPresenter {
  #activeEditFormId = null;

  #prevEventListItemComponent = null;
  #prevEditPointComponent = null;

  constructor({
    offersModel,
    destinationsModel,
    eventListItemComponents,
    editPointComponents,
    eventListElement,
    onPointDataChange,
    onFormClose,
  }) {
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
    this.eventListItemComponents = eventListItemComponents;
    this.editPointComponents = editPointComponents;
    this.eventListElement = eventListElement;
    this.onPointDataChange = onPointDataChange;
    this.onFormClose = onFormClose;
  }

  init(point) {
    if (!this.#prevEventListItemComponent && !this.#prevEditPointComponent) {
      this.#renderNewComponent(point);
      return;
    }

    this.#rerenderComponent(point);
  }

  closeForm() {
    if (!this.#activeEditFormId) {
      return;
    }

    const { listItem, editForm } = this.#getComponents(this.#activeEditFormId);

    if (listItem && editForm) {
      this.#removeEscapeListener();
      replace(listItem, editForm);
    }
  }

  #createComponents(point) {
    const pointId = point.id;

    const eventListItemComponent = new EventListItemView({
      point,
      offers: {
        allOffers: this.offersModel.get(),
        pointOffers: this.offersModel.getOffersByPoint(point),
      },
      destination: this.destinationsModel.getDestinationByID(point.destination),
      onEditToggle: () => {
        this.#handleRollupButton(pointId);
      },
      onFavoriteButtonClick: this.#handleFavoriteButtonClick
    });

    const editPointComponent = new EditPointView({
      point,
      offers: {
        allOffers: this.offersModel.get(),
        pointOffers: this.offersModel.getOffersByPoint(point),
      },
      destinations: this.destinationsModel.get(),
      destination: this.destinationsModel.getDestinationByID(point.destination),
      cities: this.destinationsModel.getCities(),
      onEditToggle: () => {
        this.#handleEditForm(pointId);
      },
      onDeleteClick: this.#onDeleteClick
    });

    return { eventListItemComponent, editPointComponent };
  }

  #renderNewComponent(point) {
    const pointId = point.id;

    const { eventListItemComponent, editPointComponent } = this.#createComponents(point);

    this.#prevEventListItemComponent = eventListItemComponent;
    this.#prevEditPointComponent = editPointComponent;

    this.eventListItemComponents.set(pointId, this.#prevEventListItemComponent);
    this.editPointComponents.set(pointId, this.#prevEditPointComponent);

    render(this.#prevEventListItemComponent, this.eventListElement);
  }

  #rerenderComponent(point) {
    const pointId = point.id;

    const { eventListItemComponent, editPointComponent } = this.#createComponents(point);

    this.eventListItemComponents.set(pointId, eventListItemComponent);
    this.editPointComponents.set(pointId, editPointComponent);

    replace(eventListItemComponent, this.#prevEventListItemComponent);

    this.#prevEventListItemComponent = eventListItemComponent;
    this.#prevEditPointComponent = editPointComponent;
  }

  #getComponents(pointId) {
    return {
      listItem: this.eventListItemComponents.get(pointId),
      editForm: this.editPointComponents.get(pointId)
    };
  }

  #removeEscapeListener = () => {
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#activeEditFormId = null;
  };

  #handleRollupButton = (pointId) => {
    this.onFormClose?.();

    const { listItem, editForm } = this.#getComponents(pointId);

    if (listItem && editForm) {
      this.#activeEditFormId = pointId;
      document.addEventListener('keydown', this.#handleEscKeyDown);
      replace(editForm, listItem);
    }
  };

  #handleFavoriteButtonClick = (point) => {
    this.onPointDataChange(
      UserAction.UPDATE,
      UpdateType.PATCH,
      { ...point, isFavorite: !point.isFavorite }
    );
  };

  #handleEditForm = (pointId) => {
    const { listItem, editForm } = this.#getComponents(pointId);

    if (listItem && editForm) {
      this.#removeEscapeListener();
      replace(listItem, editForm);
    }
  };

  #handleEscKeyDown = (evt) => {
    if (isEscape(evt.key)) {
      this.#handleEditForm(this.#activeEditFormId);
    }
  };

  #onDeleteClick = (point) => {
    this.onPointDataChange(UserAction.DELETE, UpdateType.MAJOR, point);
  };
}
