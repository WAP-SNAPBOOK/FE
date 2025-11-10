import React from 'react';
import sendIcon from '../../assets/icons/send-icon.svg';
import { ChatButton } from './chatIconButton';

export default function ChatSumbitButton({ onClick }) {
  return (
    <ChatButton onClick={onClick}>
      <img src={sendIcon} alt="addMenu" />
    </ChatButton>
  );
}
