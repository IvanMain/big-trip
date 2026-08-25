import { createElement } from '../../util/render';

const createLogoTemplate = () => '<img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">';

const createPageHeaderTemplate = () => `
  <header class="page-header">
    <div class="page-body__container  page-header__container">
      ${createLogoTemplate()}

        <div class="trip-main">

        </div>
    </div>
  </header>
`;

export default class PageHeaderView {
  getTemplate() {
    return createPageHeaderTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
