import flex from '../styles/flex';
import emotion from '@emotion/styled';
import { Icon as $Icon } from '../components/ToggleIcon';
import { Horizontal as $Horizontal, Vertical as $Vertical } from './flex-components';

export const Icon = $Icon;
export const Horizontal = $Horizontal;
export const Vertical = $Vertical;

export const TopFlex = emotion('div')({
  ...flex.vertical,
  flex: 1
});

export const Button = emotion('button')({
  padding: 20,
  minWidth: 120,
  color: 'white',
  backgroundColor: 'teal'
});

export const Header = emotion('div')(
  {
    ...flex.horizontal,
    ...flex.centerHorizontalV,
    ...flex.spaceBetween,
    padding: '0 15px',
    top: 0,
    zIndex: 999,
    height: 50,
    width: '100%',
    borderBottom: '1px solid #b2b2b2'
  },
  ({ theme }) => ({
    ...theme.barStyle
  })
);
