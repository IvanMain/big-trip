import { pointsMock } from '../mock/points-mock';

export default class PointsModel {
  constructor() {
    this.points = pointsMock;
  }

  get() {
    return this.points;
  }
}
