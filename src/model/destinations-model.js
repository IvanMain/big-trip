import ApiService from '../service/api-service.js';

export default class DestinationsModel {
  #apiService = new ApiService();

  constructor() {
    this.destinations = this.#apiService.destinations();
  }

  get() {
    return this.destinations;
  }

  getDestinationByID(destinationID) {
    return this.destinations.find((destination) => destination.id === destinationID) || {};
  }
}
