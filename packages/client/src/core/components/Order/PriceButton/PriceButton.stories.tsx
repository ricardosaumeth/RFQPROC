import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PriceButton from './PriceButton';
import { Direction } from 'modules/trades/types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/PriceButton',
  component: PriceButton,
  argTypes: {},
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof PriceButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PriceButton> = args => <PriceButton {...args} />;

export const Buy = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Buy.args = {
  direction: Direction.Buy,
  notionalValue: { value: '1,000,000' },
  order: {
    currency: {
      id: 2,
      currency: 'AUD Curcy',
      ask: 76.22,
      bid: 76.22,
      lastAsk: 76.22,
      lastBid: 76.22,
      timestamp: 20170324,
    },
  },
};

export const Sell = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sell.args = {
  direction: Direction.Sell,
  notionalValue: { value: '1,000,000' },
  order: {
    currency: {
      id: 2,
      currency: 'AUD Curcy',
      ask: 76.22,
      bid: 76.22,
      lastAsk: 76.22,
      lastBid: 76.22,
      timestamp: 20170324,
    },
  },
};
