import AbstractView from '../../framework/view/abstract-view';
import { Message } from '../../constants/enum';
import { createBoardMessageTemplate } from './common-template/create-board-message-template';

export default class EmptyView extends AbstractView {
  get template() {
    return createBoardMessageTemplate(Message.EMPTY);
  }
}
