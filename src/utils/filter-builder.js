import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FilterType } from '../constants/enum';

dayjs.extend(duration);

export default class FilterBuilder {
  constructor(points) {
    this.points = points;
  }

  getEverything() {
    return this.points;
  }

  getFuture() {
    return this.points.filter((point) => dayjs(point.dateFrom) > dayjs());
  }

  getPresent() {
    return this.points.filter((point) => (dayjs(point.dateFrom) <= dayjs()) && (dayjs(point.dateTo) >= dayjs()));
  }

  getPast() {
    return this.points.filter((point) => dayjs(point.dateTo) < dayjs());
  }

  init() {
    return {
      [FilterType.EVERYTHING]: this.getEverything(),
      [FilterType.FUTURE]: this.getFuture(this.points),
      [FilterType.PRESENT]: this.getPresent(this.points),
      [FilterType.PAST]: this.getPast(this.points),
    };
  }
}
