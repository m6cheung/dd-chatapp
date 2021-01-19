import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../';

describe('Sidebar', () => {
  const timeStamp = new Date();
  const mockProps = {
    chatRooms: [{ name: 'room1', id: 0 }],
    currentUser: 'Default',
    activeRoomId: 0,
    timeStamp
  };
  const wrapper = shallow(<Sidebar {...mockProps} />);

  it('should render the neccessary components', () => {
    expect(wrapper.find('Nav')).toHaveLength(1);
    expect(wrapper.find('TimeAgo')).toHaveLength(1);
  });
});
