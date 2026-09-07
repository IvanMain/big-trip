import { render, replace } from '../framework/render';
import { isEscape } from '../utils/common';
import { MAX_SHOW_EDIT_FORM } from '../constants/constants';
import EventListItemView from '../view/events/event-list-item-view';
import EditPointView from '../view/form/edit-point-view';

export default class PointPresenter {
  #activeEditFormId = null;

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
    const pointId = point.id;

    const eventListItemComponent = new EventListItemView(
      this.#getPointData({
        point,
        onEditToggle: () => {
          this.#handleRollupButton(pointId);
        },
        onPointDataChange: this.#handlePointDataChange
      })
    );

    const editPointComponent = new EditPointView(
      this.#getPointData({
        point,
        onEditToggle: () => {
          this.#handleEditForm(pointId);
        }
      })
    );

    this.eventListItemComponents.set(pointId, eventListItemComponent);
    this.editPointComponents.set(pointId, editPointComponent);
    render(eventListItemComponent, this.eventListElement);
  }

  #getPointData({ point, onEditToggle, onPointDataChange }) {
    return {
      point,
      offers: this.offersModel.getOffersByPoint(point),
      destination: this.destinationsModel.getDestinationByID(point.destination),
      onEditToggle,
      onPointDataChange
    };
  }

  #getComponents(pointId) {
    return {
      listItem: this.eventListItemComponents.get(pointId),
      editForm: this.editPointComponents.get(pointId)
    };
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

  #handlePointDataChange = (point) => {
    this.onPointDataChange(point);
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
}
