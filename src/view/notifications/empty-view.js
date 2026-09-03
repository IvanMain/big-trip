import AbstractView from '../../framework/view/abstract-view';
import { Message } from '../../constants/enum';
import { createBoardMessageTemplate } from '../templates/create-board-message-template';

export default class EmptyView extends AbstractView {
  get template() {
    return createBoardMessageTemplate(Message.EMPTY);
  }
}
