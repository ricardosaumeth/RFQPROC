import styled from 'styled-components';
import Palette from 'theme/style';

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 20px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    'header'
    'body';
`;

export const Header = styled.div`
  grid-area: header;
  color: ${Palette.Label};
  font-size: 12px;
`;

export const Body = styled.div`
  grid-area: body;
`;

interface VisiblePanelProps {
  name: string;
}

export const VisiblePanel = styled.div<VisiblePanelProps>`
  grid-area: ${props => props.name};
`;

export const CloseSign = styled.div`
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
  color: ${Palette.Label};
`;
