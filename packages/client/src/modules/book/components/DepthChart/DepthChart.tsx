import React, { FC, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Container } from './DepthChart.styled';
import { Ticker } from 'modules/ticker/types/Ticker';
import { uniq } from 'lodash';
import { DateTime } from 'luxon';
import 'theme/Highchart';

const CHART_TYPE = 'column';

const MAX_TRADES = 5;

export interface Props {
  trades: Ticker[];
  currency: string;
}

const DepthChart: FC<Props> = props => {
  const { trades, currency } = props;
  const [volumeData, setVolumeChart] = useState<Ticker[]>([]);

  const yValues: any = volumeData?.slice(0, MAX_TRADES).map(order => order?.bid?.toString());
  const xValues = volumeData
    ?.slice(0, MAX_TRADES)
    .map(order =>
      DateTime.fromISO(order?.timestamp?.toString() as string).toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    )
    .filter(x => x !== 'Invalid DateTime');

  const data_ = uniq(
    volumeData
      ?.slice(0, MAX_TRADES)
      .map((order: any) => {
        return parseFloat(order?.volume);
      })
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
      text: `PRICE: ${yValues[0]?.toString()}`,
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
        name: currency,
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
    if (volumeData?.length === 1) {
      setChartOptions({
        title: {
          text: `PRICE: ${yValues[0]?.toString()}`,
        },
        xAxis: {
          categories: xValues,
        },
        series: [
          {
            type: CHART_TYPE,
            name: currency,
            data: data_,
          },
        ],
      });
    } else if (volumeData?.length > 1) {
      setChartOptions({
        title: {
          text: `PRICE: ${yValues[0]?.toString()}`,
        },
        xAxis: {
          categories: xValues,
        },
        series: [
          {
            type: CHART_TYPE,
            name: currency,
            data: data_,
          },
        ],
      });
    }
  }, [volumeData, data_, xValues, yValues]);

  useEffect(() => {
    const loadDataSeries = trades?.map(order => {
      return order;
    });

    if (loadDataSeries) {
      setVolumeChart(
        loadDataSeries
          .reverse()
          .slice(0, MAX_TRADES)
          .map(x => {
            return x;
          })
          .filter(x => x.volume !== undefined)
      );
    }
  }, [trades]);

  useEffect(() => {
    setVolumeChart([]);
  }, [currency]);

  return (
    <Container>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Container>
  );
};

export default DepthChart;
