import axios from 'axios';
const API_HOST = 'http://localhost:8080/api';

export const getAllChatRooms = async () => {
  try {
    const rooms = await axios.get(`${API_HOST}/rooms`);
    return rooms.data;
  } catch (error) {
    console.error(('Error getting chat rooms', error));
  }
};

export const getChatRoomById = async (roomId) => {
  try {
    const room = await axios.get(`${API_HOST}/rooms/${roomId}`);
    return room.data;
  } catch (error) {
    console.error(`Error getting room with id - ${roomId}`, error);
  }
};

export const getChatRoomMessages = async (roomId) => {
  try {
    const room = await axios.get(`${API_HOST}/rooms/${roomId}/messages`);
    return room.data;
  } catch (error) {
    console.error(`Error getting messages from room with id - ${roomId}`);
  }
};

/*
  Expected post body data:
  {
    name: <string>,
    message: <string>
  }
*/
export const sendChatMessage = async (roomId, messageData) => {
  try {
    const response = await axios.post(
      `${API_HOST}/rooms/${roomId}/messages`,
      messageData
    );
    return response;
  } catch (error) {
    console.error(`Error sending message to room with id - ${roomId}`, error);
  }
};
