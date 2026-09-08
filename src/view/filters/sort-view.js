import AbstractView from '../../framework/view/abstract-view';
import { SortType } from '../../constants/enum';

const createFilterItemTemplate = ({ type, isDisabled, isChecked }) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isDisabled && 'disabled'} ${isChecked && 'checked'}>
  <label class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>
  `;

const createFiltersTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action = "#" method = "get">
    ${Object.values(SortType).map(createFilterItemTemplate).join('')}
  </form>
  `;

export default class SortView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
