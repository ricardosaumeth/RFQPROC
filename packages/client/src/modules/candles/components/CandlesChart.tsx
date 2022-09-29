import React, { FC, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Container } from './CandlesChart.styled';
import 'theme/Highchart';
import { Ticker } from 'modules/ticker/types/Ticker';

const MAX_TRADES = 10;

export interface Props {
  data: { bids: Ticker[] };
  currency: string;
}

const CandlesChart: FC<Props> = props => {
  const { data, currency } = props;
  const [chartData, setDataChart] = useState<number[]>([]);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    title: {
      text: 'Currency Prices',
    },
    series: [
      {
        type: 'spline',
        name: currency,
        data: [],
      },
    ],
  });
  /**
   *
   */
  useEffect(() => {
    const data = chartData?.map((i: any) => parseFloat(i));

    if (chartData?.length === 1) {
      setChartOptions({
        series: [
          {
            type: 'spline',
            name: currency,
            data: [data, data],
          },
        ],
      });
    } else if (chartData?.length > 1) {
      setChartOptions({
        series: [
          {
            type: 'spline',
            name: currency,
            data: data,
          },
        ],
      });
    }
  }, [chartData]);

  useEffect(() => {
    if (chartData?.length === 0) {
      if (data.bids?.length > 0) {
        const loadDataSeries = data?.bids?.map((bid: any) => {
          return bid.bid;
        });

        if (loadDataSeries) {
          setDataChart(loadDataSeries);
        }
      }
    } else {
      const updatedDataSeriesInState = chartData.slice();
      const lastBidInState = updatedDataSeriesInState.slice(chartData.length - 1)[0];
      const lastBidInDataSeries = data?.bids?.pop();

      if (lastBidInState !== lastBidInDataSeries?.bid) {
        // only keep the top x trades, so we don't eventually fill up the memory
        if (updatedDataSeriesInState.length > MAX_TRADES) {
          updatedDataSeriesInState.pop();
        }
        updatedDataSeriesInState.push(lastBidInDataSeries?.bid as number);
        setDataChart(updatedDataSeriesInState);
      }
    }
  }, [data?.bids]);

  useEffect(() => {
    setDataChart([]);
  }, [currency]);

  return (
    <Container>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Container>
  );
};

export default CandlesChart;
