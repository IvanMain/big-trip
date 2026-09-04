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
    isDisabled: false,
  },
  EVENT: {
    type: 'event',
    isDisabled: true,
  },
  TIME: {
    type: 'time',
    isDisabled: false,
  },
  PRICE: {
    type: 'price',
    isDisabled: false,
  },
  OFFERS: {
    type: 'offers',
    isDisabled: true,
  },
};

export {
  Message,
  FilterType,
  SortType,
};
