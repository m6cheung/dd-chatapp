import React from 'react';
import './styles.css';
import AppContext from '../../../context/appContext';
import { Card } from 'react-bootstrap';

export default class Messages extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      allMessages: props.allMessages
    };
  }

  componentDidMount() {
    this.scrollToEnd();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allMessages.length !== this.props.allMessages.length) {
      this.setState(
        {
          allMessages: this.props.allMessages
        },
        () => this.scrollToEnd()
      );
    }
  }

  scrollToEnd() {
    this.endDiv && this.endDiv.scrollIntoView();
  }

  render() {
    const { allMessages } = this.state;
    const { currentUser } = this.context;

    return allMessages ? (
      <div id='messagesWrapper'>
        {allMessages.map((msg, index) => {
          const { message, name } = msg;
          return (
            <div
              className={`${
                name === currentUser && 'currentUserMessageItem'
              } messageItem`}
              key={index}
            >
              <Card
                className={`messageBubble ${
                  name === currentUser && 'currentUserBubble'
                }`}
              >
                <Card.Body className='messageText'>{message}</Card.Body>
              </Card>
              <p className='messageBubbleUsername'>
                {currentUser === name ? '' : name}
              </p>
            </div>
          );
        })}
        <div
          id='endDiv'
          ref={(el) => {
            this.endDiv = el;
          }}
        />
      </div>
    ) : null;
  }
}
