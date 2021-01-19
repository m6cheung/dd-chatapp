import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'core-js/stable'; // Polyfills for promises
import 'regenerator-runtime/runtime'; // This dependency allows for the usage of async/await
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppProvider } from './context/appContext';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateValues = (values) => {
      this.setState({ ...values });
    };

    this.state = {
      currentUser: '',
      timeStamp: '',
      chatRooms: [],
      updateValues: this.updateValues
    };
  }

  render() {
    return (
      <AppProvider value={this.state}>
        <Router>
          <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route path='/chat/:id' component={ChatRoom}></Route>
          </Switch>
        </Router>
      </AppProvider>
    );
  }
}

const root = document.getElementById('app');
if (root) ReactDOM.render(<App />, root);
