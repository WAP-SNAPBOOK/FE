import styled from 'styled-components';

const Container = styled.div.attrs({
  className: 'flex flex-col items-center min-h-screen w-full',
})`
  justify-content: ${({ $start }) => ($start ? 'flex-start' : 'center')};
  background: ${({ $bg }) => $bg || '#fff'};
  padding: ${({ $padding }) => $padding || '0'};
`;

export default Container;
