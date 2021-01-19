import React from 'react';
import { shallow, render } from 'enzyme';
import ChatBox from '../';
import * as api from '../../../../api';

describe('ChatBox', () => {
  const mockProps = {
    currentUser: 'Default user',
    activeRoomId: 0,
    getNewMessages: jest.fn()
  };
  const wrapper = shallow(<ChatBox {...mockProps} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a text input with a send button', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('should send message if send is clicked', () => {
    const sendChatMessageStub = jest
      .spyOn(api, 'sendChatMessage')
      .mockImplementation(() => {});
    const button = wrapper.find('#sendMessageButton');
    button.simulate('click');

    expect(sendChatMessageStub).toHaveBeenCalled();
  });

  it('should send message is enter is pressed on the form', () => {
    const sendChatMessageStub = jest
      .spyOn(api, 'sendChatMessage')
      .mockImplementation(() => {});
    const form = wrapper.find('#chatBoxInput');
    form.simulate('keydown', {
      key: 'Enter',
      keyCode: 13,
      which: 13,
      preventDefault: () => {}
    });
    expect(sendChatMessageStub).toHaveBeenCalled();
  });
});
