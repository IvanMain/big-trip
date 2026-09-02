import { render } from '../utils/render';
import PageMainView from '../view/common/page-main-view';
import TripEventsView from '../view/events/trip-events-view';
import SortView from '../view/filters/sort-view';
import EventListView from '../view/events/event-list-view';
import EditPointView from '../view/form/edit-point-view';
import AddPointView from '../view/form/add-point-view';
import EventListItemView from '../view/events/event-list-item-view';
import { FormConfig } from '../configs/form-config';

export default class MainPresenter {
  pageMainComponent = new PageMainView();
  tripEventsComponent = new TripEventsView();
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  getPointData(point) {
    return {
      point,
      offers: this.offersModel.getOffersByPoint(point),
      destination: this.destinationsModel.getDestinationByID(point.destination)
    };
  }

  init() {
    this.points = [...this.pointsModel.get()];

    render(this.pageMainComponent, this.container);

    const pageMainContainerElement = this.pageMainComponent.getElement().querySelector('.page-body__container');

    render(this.tripEventsComponent, pageMainContainerElement);

    const tripEventsElement = this.tripEventsComponent.getElement();
    const eventList = this.eventListComponent.getElement();

    render(this.sortComponent, tripEventsElement);
    render(this.eventListComponent, tripEventsElement);

    render(new EditPointView(this.getPointData(this.points[1])), eventList);
    render(new AddPointView({
      point: FormConfig.ADD.data.point,
      offers: this.offersModel.getOffersByType(FormConfig.ADD.data.point.type),
    }), eventList);

    this.points.forEach((point) => render(new EventListItemView(this.getPointData(point)), eventList));
  }
}
