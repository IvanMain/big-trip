import { render } from '../util/render';
import PageMainView from '../view/common/page-main-view';
import TripEventsView from '../view/events/trip-events-view';
import SortView from '../view/filters/sort-view';
import EventListView from '../view/events/event-list-view';
import EditPointView from '../view/form/edit-point-view';
import EventListItemView from '../view/events/event-list-item-view';

export default class MainPresenter {
  pageMainComponent = new PageMainView();
  tripEventsComponent = new TripEventsView();
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.pageMainComponent, this.container);

    const pageMainContainerElement = this.pageMainComponent.getElement().querySelector('.page-body__container');

    render(this.tripEventsComponent, pageMainContainerElement);

    const tripEventsElement = this.tripEventsComponent.getElement();

    render(this.sortComponent, tripEventsElement);
    render(this.eventListComponent, tripEventsElement);

    render(new EditPointView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventListItemView(), this.eventListComponent.getElement());
    }
  }
}
