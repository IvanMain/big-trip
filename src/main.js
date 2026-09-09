import MainPresenter from './presenter/main-presenter';
import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';

const root = document.querySelector('#root');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const mainPresenter = new MainPresenter({
  container: root,
  pointsModel,
  offersModel,
  destinationsModel
});

mainPresenter.init();
