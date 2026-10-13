import Observable from '../framework/observable.js';
import { FilterType } from '../constants/enum.js';

export default class FiltersModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    if (this.#filter === filter) {
      return;
    }

    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
