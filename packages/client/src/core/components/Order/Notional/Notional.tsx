import React, { FC, useEffect, useState } from 'react';
import { useOrderContext } from '../Order.context';
import { CurrencySymbol, Input_, InputWrapper } from './Notional.styled';

type NotionalInputInnerProps = {
  id: string;
  value: string;
  onChange: (e: any) => void;
  base: string;
  valid: boolean;
  disabled: boolean;
  canReset?: boolean;
  onReset?: () => void;
};

export type Props = NotionalInputInnerProps;

export const NotionalInputInner: FC<Props> = ({ id, base, valid, disabled, value, onChange }) => (
  <InputWrapper>
    <CurrencySymbol htmlFor={id}>{base}</CurrencySymbol>
    <Input_
      type="text"
      id={id}
      className={!valid ? `is-invalid` : undefined}
      disabled={disabled}
      value={value}
      onChange={onChange}
      onFocus={(event: { target: { select: () => void } }) => {
        event.target.select();
      }}
    />
  </InputWrapper>
);

interface NotionalInput {
  notionalValue?: string;
}

interface DispatchProps {
  onClick: (notionalValue: string) => void;
}

type NotionalInputProps = NotionalInput & DispatchProps;

const NotionalInput: FC<NotionalInputProps> = ({ onClick, notionalValue }) => {
  const [notionalValue_, setNotionalValue_] = useState('1,000,000');
  const { currency } = useOrderContext();
  const id_ = `notional-input-${currency?.id}`;
  const base = currency?.currency as string;

  useEffect(() => {
    if (notionalValue !== notionalValue_) {
      onClick(notionalValue_);
    }
  }, [notionalValue_]);

  const onChangeNotionalValue = (e: string) => {
    const amount = e;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setNotionalValue_(amount);
    }
  };

  return (
    <NotionalInputInner
      id={id_}
      base={base}
      valid={true}
      disabled={false}
      value={notionalValue_}
      onChange={e => {
        onChangeNotionalValue(e.target.value);
      }}
      canReset={true}
      onReset={() => {
        onChangeNotionalValue(notionalValue_.toString());
      }}
    />
  );
};

export default NotionalInput;
