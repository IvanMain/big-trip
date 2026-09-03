import MainPresenter from './presenter/main-presenter';
import HeaderPresenter from './presenter/header-presenter';
import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';

const root = document.querySelector('#root');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const headerPresenter = new HeaderPresenter({
  container: root,
  pointsModel
});

const mainPresenter = new MainPresenter({
  container: root,
  pointsModel,
  offersModel,
  destinationsModel
});

headerPresenter.init();
mainPresenter.init();
