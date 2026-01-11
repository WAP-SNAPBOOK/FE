import styled from 'styled-components';

export const DurationPreset = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

export const PresetButton = styled.button`
  width: 48px;
  height: 46px;
  border-radius: 24px;
  border: 1px solid #ededed;
  background: ${({ $active }) => ($active ? '#f2f2f2' : '#fff')};
  color: ${({ $active }) => ($active ? '#222' : '#999')};
  font-size: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
`;

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid #ededed;
  margin-bottom: 16px;

  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: #f2f2f2;
    font-size: 18px;
    cursor: pointer;
  }

  span {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
  }
`;

export const SubText = styled.div`
  text-align: center;
  font-size: 8px;
  color: #b3b3b3;
  margin-top: 4px;
`;

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
  background: ${({ $confirmed }) => ($confirmed ? '#4CAF50' : '#ec6060')};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;
