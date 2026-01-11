import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ededed;
  resize: none;
  font-size: 13px;
  margin-bottom: 16px;

  &::placeholder {
    color: #c0c0c0;
  }
`;

export const ConfirmButton = styled.button`
  width: 85px;
  align-self: flex-end;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: ${({ $rejected }) => ($rejected ? '#9e9e9e' : '#ec6060')};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;
