import styled from 'styled-components';

const Container = styled.div.attrs({
  className: 'flex flex-col justify-center items-center min-h-screen w-full',
})`
  background: ${({ $bg }) => $bg || '#fff'};
  padding: ${({ $padding }) => $padding || '0'};
`;

export default Container;
