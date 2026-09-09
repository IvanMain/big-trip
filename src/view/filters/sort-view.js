import AbstractView from '../../framework/view/abstract-view';

const createSortItemTemplate = ({ type, isDisabled, isChecked }) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-type="${type}" value="sort-${type}"
     ${isDisabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}>
  <label class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>
  `;

const createSortTemplate = ({ sortViewData }) => `
  <form class="trip-events__trip-sort  trip-sort" action = "#" method = "get">
    ${Object.values(sortViewData).map(createSortItemTemplate).join('')}
  </form>
  `;

export default class SortView extends AbstractView {
  constructor({ sortViewData }) {
    super();
    this.sortViewData = sortViewData;
  }

  get template() {
    return createSortTemplate({
      sortViewData: this.sortViewData
    });
  }

  setChecked(type) {
    const checkedSortItem = this.element.querySelector('.trip-sort__input:checked');
    const currentSortItem = this.element.querySelector(`[data-type="${type}"]`);

    checkedSortItem.checked = false;
    currentSortItem.checked = true;
  }
}
