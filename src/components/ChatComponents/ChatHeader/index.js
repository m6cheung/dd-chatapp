import React, { useContext } from 'react';
import './styles.css';
import AppContext from '../../../context/appContext';
import { Card } from 'react-bootstrap';

const ChatHeader = ({ roomDetails: { users, name } }) => {
  const { currentUser } = useContext(AppContext);
  if (users && users.includes(currentUser)) {
    users.splice(users.indexOf(currentUser), 1);
  }
  users.push(currentUser);

  return users ? (
    <Card id='chatHeader'>
      <Card.Title id='chatHeaderCategory'>{name}</Card.Title>
      <Card.Body className='chatHeaderUsernames'>
        {users.map((user, index) => {
          return (
            <div key={user}>
              <p
                className={`${user === currentUser && 'chatHeaderCurrentUser'}`}
                key={user}
              >
                {`${user}${index !== users.length - 1 ? ',' : ''}`}&nbsp;
              </p>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  ) : null;
};

export default ChatHeader;
