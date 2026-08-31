import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { padZero } from './common';

dayjs.extend(duration);

class DayBuilder {
  get(date) {
    return dayjs(date).format('YYYY-MM-DDTHH:mm');
  }

  getShortDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
  }

  getHoursWithMinutes(date) {
    return dayjs(date).format('HH:mm');
  }

  getDuration(dateFrom, dateTo) {
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

  getDay(date) {
    return dayjs(date).format('MMM DD');
  }

  getCalendarFormat(date) {
    return dayjs(date).format('DD/MM/YY HH:mm');
  }
}

export default new DayBuilder();
