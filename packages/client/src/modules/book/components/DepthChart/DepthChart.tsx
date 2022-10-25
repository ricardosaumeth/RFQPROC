import React, { FC, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Container } from './DepthChart.styled';
import { Ticker } from 'modules/ticker/types/Ticker';
import { uniq } from 'lodash';
import { DateTime } from 'luxon';
import 'theme/Highchart';

// Load Highcharts modules
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

const CHART_TYPE = 'packedbubble';
// const CHART_TYPE = 'column';
const MAX_TRADES = 5;

const enum TradeDirection {
  Bid = 'bid',
  Ask = 'ask'
}

export interface Props {
  trades: Ticker[];
  currency: string;
}

const DepthChart: FC<Props> = props => {
  const { trades, currency } = props;
  const [tradesData, setTradesData] = useState<Ticker[]>([]);

  const asks = _getPrice(tradesData?.slice(0, MAX_TRADES), TradeDirection.Ask);
  const bids = _getPrice(tradesData?.slice(0, MAX_TRADES), TradeDirection.Bid);

  const yValues = asks;
  const xValues = tradesData
    ?.slice(0, MAX_TRADES)
    .map(order =>
      DateTime.fromISO(order?.timestamp?.toString() as string).toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    )
    .filter(x => x !== 'Invalid DateTime');
  
  const bidTitle = bids[0]?.toString();
  const askTitle = asks[0]?.toString();    

  const data_ = uniq(
    tradesData
      ?.slice(0, MAX_TRADES)
      .map(order => parseFloat(order?.volume?.toString() as string))
      .filter(x => x !== undefined)
  );

  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {
      height: (7 / 16) * 100 + '%',
    },
    time: {
      useUTC: false,
    },
    title: {
      text: `BID: ${bidTitle} - ASK: ${askTitle}`,
      style: {
        color: '#FFF',
      },
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        enabled: false,
      },
    },
    series: [
      {
        type: CHART_TYPE,
        name: `VOLUME: ${currency}`,
        data: data_,
      },
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat: '<table><tr><th colspan="2" style="text-align: center">{point.key}</th></tr>',
      pointFormat:
        '<tr><td style="color: {series.color}">Volume: </td>' +
        '<td style="text-align: right"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      valueDecimals: 0,
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          inside: true,
        },
      },
    },
  });

  useEffect(() => {
    if (tradesData?.length === 1) {
      setChartOptions({
        title: {
          text: `BID: ${bidTitle} - ASK: ${askTitle}`,
        },
        xAxis: {
          categories: xValues,
        },
        series: [
          {
            type: CHART_TYPE,
            name: `VOLUME: ${currency}`,
            data: data_,
          },
        ],
      });
    } else if (tradesData?.length > 1) {
      setChartOptions({
        title: {
          text: `BID: ${bidTitle} - ASK: ${askTitle}`,
        },
        xAxis: {
          categories: xValues,
        },
        series: [
          {
            type: CHART_TYPE,
            name: `VOLUME: ${currency}`,
            data: data_,
          },
        ],
      });
    }
  }, [tradesData, data_, xValues, yValues]);

  useEffect(() => {
    const loadDataSeries = trades?.map(order => {
      return order;
    });

    if (loadDataSeries) {
      setTradesData(
        loadDataSeries
          .reverse()
          .slice(0, MAX_TRADES)
          .map(trades => {
            return trades;
          })
          .filter(x => x.volume !== undefined)
      );
    }
  }, [trades]);

  useEffect(() => {
    setTradesData([]);
  }, [currency]);

  return (
    <Container>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Container>
  );
};

export default DepthChart;

function _getPrice<T extends Ticker, K extends keyof T>(data: T[], direction: K) {
  return data.map(order => order[direction]);
}
