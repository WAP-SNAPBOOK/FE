import React from 'react';
import dayjs from 'dayjs';
import DateDivider from '../chat/DateDivider';
import MessageItem from './MessageItem';

export default function MessageList({ messages, userId }) {
  return (
    <>
      {messages.map((msg, index) => {
        const currentDate = dayjs(msg.sentAt).format('YYYY-MM-DD'); //현재 날짜
        const prevDate = index > 0 ? dayjs(messages[index - 1].sentAt).format('YYYY-MM-DD') : null; //이전 날짜, 메시지 하나일 시 null
        const isMine = msg.senderId === userId; //사용자 본인 Id를 통한 메시지 판별
        const showDateDivider = currentDate !== prevDate; //다른 날짜 판별 기준값

        return (
          <React.Fragment key={`${index}-${msg.messageId}`}>
            {/*이전 날짜와 현재 날짜과 다르다면 구분선 추가*/}
            {showDateDivider && <DateDivider date={msg.sentAt} />}
            <MessageItem msg={msg} isMine={isMine} />
          </React.Fragment>
        );
      })}
    </>
  );
}
