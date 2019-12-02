import emotion from '@emotion/styled';
import { css } from 'emotion';

import flex from 'styles/flex';
import * as A from 'styles/shared-components';
import * as mixins from 'styles/mixins';

export const Messages = emotion('div')({
  ...flex.vertical,
  flex: 1
});

let headerHeight = 54;
const onSmall = '@media (max-width: 1000px)';

export const Header = emotion(A.Header)({
  [onSmall]: {
    position: 'absolute',
    height: headerHeight
  }
});

export const Title = emotion('div')({
  ...mixins.noSelect,
  fontWeight: 'bold'
});

export const Webview = emotion('webview')(
  {
    flex: 1
  },
  ({ showHeader }) => ({
    ...(showHeader && {
      [onSmall]: {
        marginTop: headerHeight
      }
    })
  })
);
