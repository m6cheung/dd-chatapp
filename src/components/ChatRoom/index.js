import React from 'react';
import './styles.css';
import { Row, Col } from 'react-bootstrap';
import { getChatRoomById, getChatRoomMessages } from '../../api';
import Sidebar from '../ChatComponents/Sidebar';
import ChatHeader from '../ChatComponents/ChatHeader';
import ChatBox from '../ChatComponents/ChatBox';
import Messages from '../ChatComponents/Messages';

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoomId: props.match.params.id,
      roomDetails: {},
      roomMessages: []
    };

    this.getNewMessages = this.getNewMessages.bind(this);
  }

  async componentDidMount() {
    await this.getRoomInfo(this.state.activeRoomId);
    await this.pollForMessages();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      await this.getRoomInfo(this.props.match.params.id);
    }
  }

  async getRoomInfo(id) {
    const roomMessages = await getChatRoomMessages(id);
    const roomDetails = await getChatRoomById(id);

    this.setState({
      roomDetails,
      roomMessages,
      activeRoomId: id
    });
  }

  async getNewMessages(id) {
    const roomMessages = await getChatRoomMessages(id);
    this.setState({ roomMessages });
  }

  // Poll indefinitely for new messages. Long Polling can be implemented on server side.
  async pollForMessages() {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // wrapping setTimeout in a promise so it can be used with await
      await this.getNewMessages(this.state.activeRoomId);
    }
  }

  render() {
    const { activeRoomId, roomDetails, roomMessages } = this.state;

    return roomMessages.length ? (
      <>
        <Row id='chatRoomRow'>
          <Col id='sidebarCol'>
            <Sidebar activeRoomId={activeRoomId} />
          </Col>
          <Col id='chatCol'>
            <ChatHeader roomDetails={roomDetails} />
            <Messages allMessages={roomMessages} />
            <ChatBox
              activeRoomId={activeRoomId}
              getNewMessages={this.getNewMessages}
            />
          </Col>
        </Row>
      </>
    ) : null;
  }
}
