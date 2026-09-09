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
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export {
  Message,
  FilterType,
  SortType,
};
