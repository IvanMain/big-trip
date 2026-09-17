import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { FilterType } from '../constants/enum.js';

dayjs.extend(duration);

export default class FilterBuilder {
  constructor(points) {
    this.points = [...points];
  }

  getEverything() {
    return this.points;
  }

  getFuture() {
    return this.points.filter((point) => dayjs().isBefore(point.dateFrom));
  }

  getPresent() {
    return this.points.filter((point) => dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo));
  }

  getPast() {
    return this.points.filter((point) => dayjs().isAfter(point.dateTo));
  }

  init() {
    return {
      [FilterType.EVERYTHING]: this.getEverything(),
      [FilterType.FUTURE]: this.getFuture(),
      [FilterType.PRESENT]: this.getPresent(),
      [FilterType.PAST]: this.getPast(),
    };
  }
}
