import React, { FC, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Container } from './CandlesChart.styled';
import Palette from 'theme/style';
import { Candle } from '../types/Candle';
import 'theme/Highchart';

export interface Props {
  candles: Candle[];
  currency?: string;
}

const CandlesChart: FC<Props> = props => {
  const { candles, currency } = props;
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    series: [
      {
        type: 'candlestick',
        data: [],
      },
    ],

    rangeSelector: {
      selected: 1,
      buttons: [
        {
          type: 'minute',
          count: 5,
          text: '5m',
        },
        {
          type: 'minute',
          count: 30,
          text: '30m',
        },
        {
          type: 'hour',
          count: 1,
          text: '1h',
        },
        {
          type: 'hour',
          count: 12,
          text: '12h',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
    },
  });

  useEffect(() => {
    if (candles && candles.length > 0) {
      const data = candles
        .map(({ timestamp, ...rest }: any) => ({
          x: timestamp,
          ...rest,
        }))
        .sort((a: any, b: any) => a.x - b.x);
      setChartOptions({
        series: [
          {
            type: 'candlestick',
            name: currency,
            data,
          },
        ],
        plotOptions: {
          candlestick: {
            color: Palette.Negative,
            upColor: Palette.Positive,
          },
        },
      });
    }
  }, [candles, currency]);

  return (
    <Container>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} constructorType={'stockChart'} />
    </Container>
  );
};

export default CandlesChart;
