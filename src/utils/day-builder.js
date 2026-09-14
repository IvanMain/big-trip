import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { padZero } from './common';

dayjs.extend(duration);

export default class DayBuilder {
  static get(date) {
    return dayjs(date).format('YYYY-MM-DDTHH:mm');
  }

  static getShortDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  }

  static getHoursWithMinutes(date) {
    return dayjs(date).format('HH:mm');
  }

  static getDurationMilliseconds(dateFrom, dateTo) {
    return dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).asMilliseconds();
  }

  static getDuration(dateFrom, dateTo) {
    const ms = dayjs(dateTo).diff(dayjs(dateFrom));
    const totalMinutes = Math.floor(Math.abs(ms) / 1000 / 60);
    const days = padZero(Math.floor(totalMinutes / (60 * 24)));
    const hours = padZero(Math.floor(totalMinutes / 60) % 24);
    const minutes = padZero(totalMinutes % 60);

    const parts = [];

    if (days !== '00') {
      parts.push(`${days}D`);
    }

    if (hours !== '00') {
      parts.push(`${hours}H`);
    }

    if (minutes !== '00') {
      parts.push(`${minutes}M`);
    }

    return parts.join(' ');
  }

  static getDay(date) {
    return dayjs(date).format('MMM DD');
  }

  static getCalendarFormat(date) {
    return dayjs(date).format('DD/MM/YY HH:mm');
  }
}
