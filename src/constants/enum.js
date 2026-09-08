const Message = {
  EMPTY: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILED: 'Failed to load latest route information',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: {
    type: 'day',
    isChecked: true,
    isDisabled: false,
  },
  EVENT: {
    type: 'event',
    isChecked: false,
    isDisabled: true,
  },
  TIME: {
    type: 'time',
    isChecked: false,
    isDisabled: false,
  },
  PRICE: {
    type: 'price',
    isChecked: false,
    isDisabled: false,
  },
  OFFERS: {
    type: 'offers',
    isChecked: false,
    isDisabled: true,
  },
};

export {
  Message,
  FilterType,
  SortType,
};
