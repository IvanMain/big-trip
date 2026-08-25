import { createElement } from '../../util/render';
import { Message } from '../../constants/enum';
import { createBoardMessageTemplate } from './common-template/create-board-message-template';

export default class EmptyView {
  getTemplate() {
    return createBoardMessageTemplate(Message.EMPTY);
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
