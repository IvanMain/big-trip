import { pointsMock } from '../mock/points-mock.js';
import { offersMock } from '../mock/offers-mock.js';
import { destinationsMock } from '../mock/destinations-mock.js';

export default class ApiService {
  points() {
    return pointsMock;
  }

  offers() {
    return offersMock;
  }

  destinations() {
    return destinationsMock;
  }
}
