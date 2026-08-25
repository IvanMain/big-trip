import { render } from '../util/render';
import PageHeaderView from '../view/header/page-header-view';
import TripInfoView from '../view/header/trip-info-view';
import NewEventButtonView from '../view/header/new-event-button-view';
import FiltersView from '../view/filters/filters-view';

export default class HeaderPresenter {
  pageHeaderComponent = new PageHeaderView();
  tripInfoComponent = new TripInfoView();
  filtersComponent = new FiltersView();
  newEventButtonComponent = new NewEventButtonView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.pageHeaderComponent, this.container);

    const tripMainElement = this.pageHeaderComponent.getElement().querySelector('.trip-main');

    render(this.tripInfoComponent, tripMainElement);
    render(this.filtersComponent, tripMainElement);
    render(this.newEventButtonComponent, tripMainElement);
  }
}
