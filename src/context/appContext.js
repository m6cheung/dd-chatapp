import React from 'react';

const AppContext = React.createContext({
  currentUser: '',
  timeStamp: '',
  chatRooms: [],
  updateValues: () => {}
});

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

export default AppContext;
