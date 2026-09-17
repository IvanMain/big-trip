import AbstractView from '../../framework/view/abstract-view.js';
import { Message } from '../../constants/enum.js';
import { createBoardMessageTemplate } from '../templates/create-board-message-template.js';

export default class FailedView extends AbstractView {
  get template() {
    return createBoardMessageTemplate(Message.FAILED);
  }
}
