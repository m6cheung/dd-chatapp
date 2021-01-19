import React, { useContext } from 'react';
import TimeAgo from 'react-timeago';
import './styles.css';
import AppContext from '../../../context/appContext';
import { useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ activeRoomId }) => {
  const history = useHistory();
  const { chatRooms, currentUser, timeStamp } = useContext(AppContext);

  const updateRoute = (id) => {
    history.push({
      pathname: `/chat/${id}`
    });
  };

  const timeFormat = (value, unit) => {
    return `${value} ${unit}${value > 1 ? 's' : ''}`;
  };

  return (
    <div id='sidebar'>
      <Nav variant='pills' activeKey={activeRoomId} id='sideNav'>
        <h4 id='sidebarUsername'>{currentUser}</h4>
        <p id='sidebarLoginTime'>
          Online for <TimeAgo date={timeStamp} formatter={timeFormat} />
        </p>

        {chatRooms.map((category) => {
          return (
            <Nav.Item key={category.name}>
              <Nav.Link
                onClick={() => updateRoute(category.id)}
                className='categoryLink'
                eventKey={category.id}
              >
                {category.name}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default Sidebar;
