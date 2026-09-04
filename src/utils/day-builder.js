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

  static getDuration(dateFrom, dateTo) {
    const diff = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
    const days = padZero(diff.days());
    const hours = padZero(diff.hours());
    const minutes = padZero(diff.minutes());

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
