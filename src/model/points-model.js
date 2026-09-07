import ApiService from '../service/api-service';

export default class PointsModel {
  #apiService = new ApiService();

  constructor() {
    this.points = this.#apiService.points();
  }

  get() {
    return this.points;
  }
}
