import Observable from '../framework/observable.js';
import ApiService from '../service/api-service.js';

export default class PointsModel extends Observable {
  #apiService = new ApiService();
  #points = [];

  constructor() {
    super();
    this.#points = this.#apiService.points();
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Не могу обновить несуществующий point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [...this.#points, update];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Не могу удалить несуществующий point');
    }

    this.#points = this.#points.filter((point) => point.id !== update.id);
    this._notify(updateType, update);
  }
}
