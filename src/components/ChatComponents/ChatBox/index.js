import React, { useState, useContext } from 'react';
import './styles.css';
import { Form, Card, Button, Col } from 'react-bootstrap';
import AppContext from '../../../context/appContext';
import { sendChatMessage } from '../../../api';

const ChatBox = ({ activeRoomId, getNewMessages }) => {
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { currentUser } = useContext(AppContext);

  const sendMessage = async (message) => {
    await sendChatMessage(activeRoomId, {
      name: currentUser,
      message
    });
    await getNewMessages(activeRoomId);
    setMessage('');
  };

  const handleChange = (event) => {
    const message = event.target.value;
    setMessage(message);
    if (message.length) setDisabled(false);
    else setDisabled(true);
  };

  const handleKeyDown = async (event) => {
    if (event.keyCode === 13 || event.which == 13) {
      event.preventDefault();
      if (message.length) await sendMessage(message);
    }
  };

  return (
    <Card id='chatBoxWrapper'>
      <Form>
        <Form.Row id='chatBoxRow'>
          <Col id='chatBoxCol'>
            <Form.Control
              id='chatBoxInput'
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type='text'
              placeholder='Type a message...'
              autoComplete='off'
            />
          </Col>
          <Col id='sendButtonCol'>
            <Button
              onClick={async () => await sendMessage(message)}
              id='sendMessageButton'
              variant='link'
              disabled={disabled}
            >
              Send
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Card>
  );
};

export default ChatBox;
