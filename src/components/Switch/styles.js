import emotion from '@emotion/styled';
import flex from 'styles/flex';
import * as mixins from 'styles/mixins';

export const Switch = emotion('div')({
  ...flex.horizontal,
  ...flex.centerHorizontalV,
  marginBottom: 15
});

export const Label = emotion('label')({
  fontSize: 16,
  marginLeft: 15,
  ...mixins.noSelect
});
