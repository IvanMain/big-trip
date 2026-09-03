const Message = {
  EMPTY: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILED: 'Failed to load latest route information',
};

const FILTER_TYPES = ['everything', 'future', 'present', 'past'];

const FilterType = {
  DAY: {
    type: 'day',
    isDisabled: false,
  },
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
  SortType
};
