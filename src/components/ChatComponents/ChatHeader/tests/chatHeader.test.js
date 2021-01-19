import React from 'react';
import { shallow } from 'enzyme';
import ChatHeader from '../';

describe('ChatHeader', () => {
  const mockProps = {
    roomDetails: { users: ['mock name1', 'mock name2'], name: 'room1' },
    currentUser: 'Default User'
  };
  const wrapper = shallow(<ChatHeader {...mockProps} />);

  it('should render a Card component as the header', () => {
    expect(wrapper.find('Card')).toHaveLength(1);
  });

  it('should render a child element for each user including the current user', () => {
    expect(wrapper.find('.chatHeaderUsernames')).toHaveLength(1);
    expect(
      wrapper.find('.chatHeaderUsernames').children().children().length
    ).toEqual(3);
  });
});
