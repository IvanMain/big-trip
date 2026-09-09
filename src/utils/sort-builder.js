import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { SortType } from '../constants/enum';
import DayBuilder from './day-builder';

dayjs.extend(duration);

export default class SortBuilder {
  constructor(points) {
    this.points = [...points];
  }

  getDay() {
    return this.points.toSorted();
  }

  getTime() {
    return this.points.toSorted((prevPoint, nextPoint) => DayBuilder.getDurationMilliseconds(prevPoint.dateTo, prevPoint.dateFrom) - DayBuilder.getDurationMilliseconds(nextPoint.dateTo, nextPoint.dateFrom));
  }

  getPrice() {
    return this.points.toSorted((prevPoint, nextPoint) => nextPoint.basePrice - prevPoint.basePrice);
  }

  init() {
    return {
      [SortType.DAY]: this.getDay(),
      [SortType.TIME]: this.getTime(),
      [SortType.PRICE]: this.getPrice(),
    };
  }
}
