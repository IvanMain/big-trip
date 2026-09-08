const Message = {
  EMPTY: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILED: 'Failed to load latest route information',
  NO_FUTURE_FILTERS: 'There are no future events now',
  NO_PRESENT_FILTERS: 'There are no present events now',
  NO_PAST_FILTERS: 'There are no past events now',
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
