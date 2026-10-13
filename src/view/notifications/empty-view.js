import AbstractView from '../../framework/view/abstract-view.js';
import { Message } from '../../constants/enum.js';
import { createBoardMessageTemplate } from '../templates/create-board-message-template.js';

export default class EmptyView extends AbstractView {
  #text = Message.EMPTY;

  constructor({ text = Message.EMPTY } = {}) {
    super();
    this.#text = text;
  }

  get template() {
    return createBoardMessageTemplate(this.#text);
  }
}
