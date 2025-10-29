import axiosClient from '../axiosClient';

export const chatService = {
  //채팅방 목록 조회
  getChatRooms: async () => {
    const res = await axiosClient.get('/chat/rooms/', { params: { user: {} } });
    return res.data;
  },

  // 특정 채팅방 메시지 조회
  getMessages: async (chatRoomId, cursor = null, size = 50) => {
    try {
      const params = {
        user: {},
        cursor,
        size,
      };

      const res = await axiosClient.get(`/chat/rooms/${chatRoomId}/messages`, {
        params,
      });
      const messages = res.data;

      // nextCursor 계산: 메시지가 있다면 첫번째 messageId
      const nextCursor = messages.length > 0 ? messages[0].messageId : null;

      return { messages, nextCursor };
    } catch (error) {
      console.error('[getMessages] 메시지 조회 실패:', error);
      throw error;
    }
  },
};
