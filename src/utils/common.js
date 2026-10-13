const padZero = (value) => String(value).padStart(2, '0');

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const isEscape = (key) => key === 'Escape' || key === 'Esc';

export { padZero, isEmptyObject, isEscape };
