import emotion from '@emotion/styled';
import { css } from 'emotion';
import flex from '../../styles/flex';

export const Compose = emotion('div')({
  ...flex.vertical,
  flex: 1
});

export const Cog = emotion('div')({
  color: '#75c0ff',
  fontSize: 16
});

export const Webview = css({
  flex: 1
});

export const Bar = emotion('div')({
  ...flex.horizontal,
  ...flex.centerHorizontalV,
  height: 25,
  width: '100%',
  backgroundColor: '#f0f0f0',
  boxShadow: '1px 1px 1px 1px black',
  zIndex: 99999
});
