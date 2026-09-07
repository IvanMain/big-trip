import { pointsMock } from '../mock/points-mock';
import { offersMock } from '../mock/offers-mock';
import { destinationsMock } from '../mock/destinations-mock';

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
