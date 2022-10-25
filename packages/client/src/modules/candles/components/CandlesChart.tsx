import React, { FC, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Container } from './CandlesChart.styled';
import Palette from 'theme/style';
import { Candle } from '../types/Candle';
import dataModule from 'highcharts/modules/data';
import exportingModule from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators';
import ema from 'highcharts/indicators/ema';
import 'theme/Highstock';

dataModule(Highcharts);
exportingModule(Highcharts);
indicators(Highcharts);
ema(Highcharts);

export interface Props {
  candles: Candle[];
  currency?: string;
}

const CandlesChart: FC<Props> = props => {
  const { candles, currency } = props;
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>();

  useEffect(() => {
    setChartOptions({
      chart: {
        events: {
          load() {
            setTimeout(this.reflow.bind(this), 0);
          },
        },
        height: (4.5 / 16) * 100 + '%',
      },
      time: {
        useUTC: false,
      },
      yAxis: [
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'OHLC',
          },
          height: '70%',
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'Volume',
          },
          top: '75%',
          height: '25%',
          offset: 0,
          lineWidth: 2,
        },
      ],
      series: [
        {
          type: 'candlestick',
          id: 'ohlc',
          zIndex: 2,
          data: [],
        },
        {
          type: 'column',
          name: 'Volume',
          data: [],
          yAxis: 1,
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
  }, []);

  useEffect(() => {
    if (candles && candles.length > 0) {
      const ohlc = candles
        .map(({ timestamp, ...rest }: any) => ({
          x: timestamp,
          ...rest,
        }))
        .sort((a: any, b: any) => a.x - b.x);
      const volumes = candles
        .map(({ timestamp, volume }) => [timestamp, volume])
        .sort((a, b) => a[0] - b[0]);
      setChartOptions({
        series: [
          {
            type: 'candlestick',
            id: 'ohlc',
            zIndex: 2,
            data: ohlc,
          },
          {
            type: 'column',
            data: volumes,
          },
          {
            type: 'sma',
            id: 'sma03P',
            name: 'SMA 03P',
            linkedTo: 'ohlc',
            zIndex: 1,
            marker: {
              enabled: false
            },
            params: {
              period: 3
            },
          },
          {
            type: 'sma',
            id: 'sma10P',
            name: 'SMA 10P',
            linkedTo: 'ohlc',
            params: {
              period: 10
            },
            zIndex: 1,
            marker: {
              enabled: false
            }
          }
        ],
        plotOptions: {
          candlestick: {
            color: Palette.Negative,
            upColor: Palette.Positive,
          },
          series: {
            pointInterval: 1000 * 60 * 1, // data every minute
            turboThreshold: 0
          },
        },
      });
    }
  }, [candles, currency]);

  return (
    <Container>
      <HighchartsReact 
        highcharts={Highcharts} 
        options={chartOptions} 
        constructorType={'stockChart'} />
    </Container>
  );
};

export default CandlesChart;
