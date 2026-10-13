import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filters-model.js';

const root = document.querySelector('#root');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filtersModel = new FiltersModel();

const mainPresenter = new MainPresenter({
  container: root,
  pointsModel,
  offersModel,
  destinationsModel,
  filtersModel
});

mainPresenter.init();
