import MainPresenter from './presenter/main-presenter';
import HeaderPresenter from './presenter/header-presenter';

const root = document.querySelector('#root');
const headerPresenter = new HeaderPresenter({ container: root });
const mainPresenter = new MainPresenter({ container: root });

headerPresenter.init();
mainPresenter.init();
