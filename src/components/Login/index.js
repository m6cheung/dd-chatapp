import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import AppContext from '../../context/appContext';
import { getAllChatRooms } from '../../api';
import { Button, Form } from 'react-bootstrap';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [disabled, setDisabled] = useState(true);
  const appContext = useContext(AppContext);

  const history = useHistory();

  const handleChange = (event) => {
    const user = event.target.value;
    setUsername(user);
    if (!user.length) setDisabled(true);
    else setDisabled(false);
  };

  const handleKeyDown = async (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      await signInWithUser();
    }
  };

  const signInWithUser = async () => {
    const allChatRooms = await getAllChatRooms();
    appContext.updateValues({
      currentUser: username,
      chatRooms: allChatRooms,
      timeStamp: new Date()
    });

    history.push({
      pathname: `/chat/${allChatRooms[0].id}`
    });
  };

  return (
    <div id='loginWrapper'>
      <Form.Group>
        <Form.Control
          id='userInput'
          value={username}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          type='text'
          placeholder='Type your username...'
          autoComplete='off'
        />
        <Button disabled={disabled} id='loginButton' onClick={signInWithUser}>
          Join the DoorDash Chat!
        </Button>
      </Form.Group>
    </div>
  );
};

export default Login;
