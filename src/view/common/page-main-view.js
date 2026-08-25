import { createElement } from '../../util/render';

const createPageMainTemplate = () => `
  <main class="page-body__page-main  page-main">
    <div class="page-body__container"></div>
  </main>
`;

export default class PageMainView {
  getTemplate() {
    return createPageMainTemplate();
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
