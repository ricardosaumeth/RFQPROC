import styled from 'styled-components';
import Palette from 'theme/style';

export const Container = styled.div`
  background-color: ${Palette.BackgroundColor};
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Content = styled.div`
  width: 100%;
  padding: 5px 10px;
`;