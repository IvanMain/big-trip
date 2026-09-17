import { render, replace } from '../framework/render.js';
import { isEscape } from '../utils/common.js';
import { MAX_SHOW_EDIT_FORM } from '../constants/constants.js';
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
    activeEditForms
  }) {
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
    this.eventListItemComponents = eventListItemComponents;
    this.editPointComponents = editPointComponents;
    this.eventListElement = eventListElement;
    this.onPointDataChange = onPointDataChange;
    this.activeEditForms = activeEditForms;
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

  #hiddenActiveEditForm() {
    if (this.activeEditForms.size > MAX_SHOW_EDIT_FORM) {
      const entries = [...this.activeEditForms];

      entries.forEach(([key, value]) => {
        if (key !== this.#activeEditFormId) {
          replace(value.listItem, value.editForm);
          this.activeEditForms.delete(key);
        }
      });
    }
  }

  #handleRollupButton = (pointId) => {
    const { listItem, editForm } = this.#getComponents(pointId);

    if (listItem && editForm) {
      this.#activeEditFormId = pointId;

      document.addEventListener('keydown', this.#handleEscKeyDown);

      replace(editForm, listItem);

      this.activeEditForms.set(this.#activeEditFormId, { editForm, listItem });

      this.#hiddenActiveEditForm();
    }
  };

  #handleFavoriteButtonClick = (point) => {
    this.onPointDataChange({ ...point, isFavorite: !point.isFavorite });
  };

  #handleEditForm = (pointId) => {
    const { listItem, editForm } = this.#getComponents(pointId);

    if (listItem && editForm) {
      this.#removeEscapeListener();
      replace(listItem, editForm);

      this.activeEditForms.delete(pointId);
    }
  };

  #handleEscKeyDown = (evt) => {
    if (isEscape(evt.key)) {
      this.#handleEditForm(this.#activeEditFormId);
    }
  };
}
