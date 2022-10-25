import React, { FC } from 'react';
import { CloseSign } from './Widget.styled';
import Widget from './Widget';
import Market from 'modules/ticker/components/Market';
import Trades from 'modules/trades/components';
import CandlesChart from 'modules/candles/components';
import Book from 'modules/book/components/Book';
import DepthChart from 'modules/book/components/DepthChart';
import { KnownComponentsStr } from '../types/Components';

export interface Props {
  title: string;
  name: KnownComponentsStr;
  handleClose?(name: string): void;
}

const CloseableWidget: FC<Props> = props => {
  const { title, name, handleClose } = props;

  return (
    <>
      {name === 'candle' ? (
        <CandlesChart />
      ) : (
        <Widget title={title}>
          {name === 'market' ? (
            <Market />
          ) : name === 'trades' ? (
            <Trades />
          ) : name === 'depth' ? (
            <DepthChart />
          ) : (
            <Book />
          )}
        </Widget>
      )}
      {handleClose && <CloseSign onClick={() => handleClose(name)}>x</CloseSign>}
    </>
  );
};

export default CloseableWidget;
