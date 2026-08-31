import { destinationsMock } from '../mock/destinations-mock';

export default class DestinationsModel {
  constructor() {
    this.destinations = destinationsMock;
  }

  get() {
    return this.destinations;
  }

  getDestinationByID(destinationID) {
    return this.destinations.find((destination) => destination.id === destinationID) || {};
  }
}
