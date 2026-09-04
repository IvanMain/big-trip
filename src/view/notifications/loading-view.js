import AbstractView from '../../framework/view/abstract-view';
import { Message } from '../../constants/enum';
import { createBoardMessageTemplate } from '../templates/create-board-message-template';

export default class LoadingView extends AbstractView {
  get template() {
    return createBoardMessageTemplate(Message.LOADING);
  }
}
