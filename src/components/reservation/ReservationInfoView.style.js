import styled from 'styled-components';

export const DetailSection = styled.div`
  font-size: 13px;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const DetailBlock = styled.div`
  margin-top: 8px;
`;

export const DetailValues = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PhotoGrid = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px 0;
`;

export const Photo = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #e5e5e5;
`;

export const RequestBox = styled.div`
  margin-top: 8px;
  padding: 10px;
  background: #fafafa;
  border-radius: 10px;
  color: #555;
`;

export const Chip = styled.span`
  min-width: 36px;
  padding: 2px 8px;
  background: #f2f2f2;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #555;
  text-align: center;
`;

export const Label = styled.span`
  color: #c0c0c0;
  font-weight: 600;
`;

export const OptionGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Option = styled.span`
  font-size: 13px;
  font-weight: ${({ active }) => (active ? 600 : 500)};
  color: ${({ active }) => (active ? '#222' : '#cfcfcf')};
`;
