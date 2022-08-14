import { Box, Modal, styled } from '@mui/material';

export const Container = styled(Modal)`
  .MuiBackdrop-root.css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop {
    background-color: #e0e0e0;
    opacity: 0.1 !important;
  }
`;

export const Panel = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  width: 400px;
  padding: 4px;
  min-height: 11rem;
  color: #282e39;

  border-radius: 3px;
  padding: 1.25rem;
  box-sizing: border-box;
  display: grid;
  gap: 10px;
  overflow: hidden;
`;

export const HeaderWrapper = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
`;

export const TileSymbol = styled(Box)`
  color: #282e39;
  font-size: 0.8125rem;
  line-height: 1rem;
`;

export const DeliveryDate = styled(Box)`
  color: #282e39;
  font-size: 0.625rem;
  line-height: 1rem;
  opacity: 0.59;
  margin-left: auto;
  transition: margin-right 0.2s;
`;

export const PriceControlWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 77%;
`;

export const PriceControlsStyle = styled(Box)`
  display: grid;
  position: relative;
  height: 4rem;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  grid-template-areas: 'sell buy';
`;

export const InputTimerStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
