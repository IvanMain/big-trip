const padZero = (value) => String(value).padStart(2, '0');

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const isEscape = (key) => key === 'Escape' || key === 'Esc';

const updateData = (data, changedDataItem) => data.map((item) => item.id === changedDataItem.id ? changedDataItem : item);

export { padZero, isEmptyObject, isEscape, updateData };
