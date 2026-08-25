const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITIES = ['Amsterdam', 'Geneva', 'Chamonix'];

const OFFER_TYPES = [
  {
    type: 'luggage',
    cost: '50',
    label: 'Add luggage',
  },
  {
    type: 'comfort',
    cost: '80',
    label: 'Switch to comfort class',
  },
  {
    type: 'meal',
    cost: '15',
    label: 'Add meal',
  },
  {
    type: 'seats',
    cost: '5',
    label: 'Choose seats',
  },
  {
    type: 'train',
    cost: '40',
    label: 'Travel by train',
  },
];

const GALLERY_ITEMS = [
  {
    src: 'img/photos/1.jpg',
    alt: 'Первое фото',
  },
  {
    src: 'img/photos/2.jpg',
    alt: 'Второе фото',
  },
  {
    src: 'img/photos/3.jpg',
    alt: 'Третье фото',
  },
  {
    src: 'img/photos/4.jpg',
    alt: 'Четвёртое фото',
  },
  {
    src: 'img/photos/5.jpg',
    alt: 'Пятое фото',
  },
];

const FILTER_TYPES = ['everything', 'future', 'present', 'past'];

const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];

export {
  EVENT_TYPES,
  CITIES,
  OFFER_TYPES,
  GALLERY_ITEMS,
  FILTER_TYPES,
  SORT_TYPES,
};
