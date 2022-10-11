import styled from 'styled-components';
import Palette from 'theme/style';

export const Container = styled.div`
  grid-area: header;
  color: ${Palette.White};
  font-family: FiraSans-MediumItalic;
  background-color: #2d3436;
  padding: 0 0 0 10px;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
`;

export const HeaderMenu = styled.span`
  font-size: x-large;
  margin-left: 15px;
  cursor: pointer;
`;
