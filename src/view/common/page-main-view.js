import AbstractView from '../../framework/view/abstract-view.js';

const createPageMainTemplate = () => `
  <main class="page-body__page-main  page-main">
    <div class="page-body__container"></div>
  </main>
`;

export default class PageMainView extends AbstractView {
  get template() {
    return createPageMainTemplate();
  }
}
