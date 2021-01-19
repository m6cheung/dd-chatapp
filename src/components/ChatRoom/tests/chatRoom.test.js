import React from 'react';
import { shallow } from 'enzyme';
import ChatRoom from '../';
import * as api from '../../../api';

describe('ChatRoom', () => {
  const timeStamp = new Date();
  const mockProps = {
    match: { params: { id: 0 } },
    location: {
      state: {
        currentUser: 'Default',
        chatRooms: [
          { name: 'room1', id: 0 },
          { name: 'room2', id: 1 }
        ],
        timeStamp
      }
    }
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = shallow(<ChatRoom {...mockProps} />);
  it('should render the Sidebar, ChatHeader, Messages, and ChatBox components', () => {
    expect(wrapper.find('Sidebar')).toHaveLength(1);
    expect(wrapper.find('ChatHeader')).toHaveLength(1);
    expect(wrapper.find('Messages')).toHaveLength(1);
    expect(wrapper.find('ChatBox')).toHaveLength(1);
  });

  it('should call getChatRoomMessages when getNewMesssages is called with the given room id', async () => {
    const getChatRoomMessagesStub = jest
      .spyOn(api, 'getChatRoomMessages')
      .mockImplementation(() => true);
    const instance = wrapper.instance();
    await instance.getNewMessages(0);

    expect(getChatRoomMessagesStub).toHaveBeenCalled();
    expect(instance.state.roomMessages).toEqual(true);
  });

  it('should set state with results from getRoomInfo and start polling when componentDidMount is called', async () => {
    const instance = wrapper.instance();
    const getRoomInfoStub = jest
      .spyOn(instance, 'getRoomInfo')
      .mockImplementation(() => ({ roomDetails: true, roomMessages: true }));
    const pollStub = jest
      .spyOn(instance, 'pollForMessages')
      .mockImplementation(() => {});

    await instance.componentDidMount();

    expect(getRoomInfoStub).toHaveBeenCalled();
    expect(pollStub).toHaveBeenCalled();
    expect(instance.state).toMatchObject({
      roomDetails: true,
      roomMessages: true
    });
  });
});
