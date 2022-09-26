import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderConfirmation from './OrderConfirmation';
import { Direction } from 'modules/trades/types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/OrderConfirmation',
  component: OrderConfirmation,
  argTypes: {},
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof OrderConfirmation>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OrderConfirmation> = args => <OrderConfirmation {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  orderData: {
    currency: {
      id: 1,
      currency: 'AUD Curcy',
      ask: 76.22,
      bid: 76.22,
      lastAsk: 76.22,
      lastBid: 76.22,
      timestamp: 20170324,
    },
    direction: Direction.Buy,
    notionalValue: { value: '5,000' },
  },
  tradeSelected: {
    isModalOpen: false,
    currency: {
      id: 1,
      currency: 'AUD Curcy',
      ask: 76.22,
      bid: 76.22,
      lastAsk: 76.22,
      lastBid: 76.22,
      timestamp: 20170324,
    },
  },
};
