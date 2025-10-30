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

      // nextCursor 계산: 이번에 받은 것 중 가장 오래된 메시지ID
      const nextCursor = messages.length === size ? messages[messages.length - 1].messageId : null;

      return { messages, nextCursor };
    } catch (error) {
      console.error('[getMessages] 메시지 조회 실패:', error);
      throw error;
    }
  },
};
