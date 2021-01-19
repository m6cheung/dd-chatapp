import React from 'react';
import { shallow } from 'enzyme';
import Login from '../';
import * as api from '../../../api';

describe('Login', () => {
  const wrapper = shallow(<Login />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have a user form field with a login button', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('#userInput')).toHaveLength(1);
  });

  it('should get all chat rooms when user logs in', () => {
    const button = wrapper.find('#loginButton');
    const getAllChatRoomsSpy = jest.spyOn(api, 'getAllChatRooms');

    button.simulate('click');

    expect(getAllChatRoomsSpy).toHaveBeenCalled();
  });
});
