import React from 'react';
import { shallow } from 'enzyme';
import Messages from '../';

describe('Messages', () => {
  const mockProps = {
    allMessages: [{ name: 'mock', message: 'mock message' }],
    currentUser: 'Default'
  };
  const wrapper = shallow(<Messages {...mockProps} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Messages with a Card component', () => {
    expect(wrapper.find('Card')).toHaveLength(1);
  });

  it('should set state and scroll to the end of the chat when component updates', () => {
    const instance = wrapper.instance();
    const scrollToEndSpy = jest.spyOn(instance, 'scrollToEnd');
    const setStateSpy = jest.spyOn(instance, 'setState');
    instance.componentDidUpdate(mockProps);

    expect(scrollToEndSpy).toHaveBeenCalled();
    expect(setStateSpy).toHaveBeenCalled();
  });
});
