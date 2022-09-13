import { styled } from '@mui/material';
import styledComponent from 'styled-components';

export const InputWrapper = styled('div')`
  padding-right: 1.3rem;
`;

export const CurrencySymbol = styled('label')`
  display: inline-block;
  width: auto;
  opacity: 0.59;
  font-size: 0.625rem;
  line-height: 1.2rem;
  margin-right: 2px;
`;

export const Input_ = styledComponent.input`
  grid-area: Input;
  background: none;
  text-align: center;
  outline: none;
  border: none;
  font-size: 0.75rem;
  width: 80px;
  padding: 2px 0;
  color: #282e39;
  border-bottom: 1.5px solid #bdbec3;
  &:focus {
    outline: none !important;
    border-color: #2d95ff;
  }
  &:disabled {
    opacity: 0.3;
  }
  &.is-invalid {
    border-bottom-color: #ff274b;
  }
`;
