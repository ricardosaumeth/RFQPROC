import Palette from 'theme/style';
import { Button, Box, styled } from '@mui/material';
import { Direction } from 'modules/trades/types';

type TradeButtonProps = {
  direction: Direction;
};

export const TradeButton = styled(Button)<TradeButtonProps>`
  background-color: #fff;
  border-radius: 3px;
  color: #282e39;
  -webkit-transition: background-color 0.2s ease;
  transition: background-color 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
  height: 100%;
  min-width: 75px;
  padding: 0.6rem 1.5rem 0.9rem 1.5rem;

  &:hover {
    background-color: ${({ direction }) => (direction === Direction.Sell ? Palette.Sell : Palette.Buy)};
    color: ${Palette.White};
  }
`;

export const Price = styled(Box)<{ disabled: boolean }>`
  height: 2.1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ disabled }) => (disabled ? 'opacity: 0.3' : '')}
`;

export const CenteringContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const DirectionLabel = styled(Box)`
  opacity: 0.59;
  margin: 0 0 0.125rem 0;
  font-size: 0.625rem;

  color: inherit;
`;

export const Big = styled(Box)`
  font-size: 0.8125rem;
  line-height: 1rem;
`;

export const Pip = styled(Box)`
  font-size: 2.125rem;
  line-height: 2.5rem;
  margin: 0 0.125rem;
`;

export const Tenth = styled(Box)`
  margin: 0.125rem 0;
  align-self: flex-end;
`;
