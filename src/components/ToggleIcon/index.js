import React from 'react';
import emotion from '@emotion/styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export const FontIcon = emotion(FontAwesomeIcon)(
  {
    color: '#75c0ff',
    transition: 'all 150ms linear',
    cursor: 'pointer',
    '&:hover': {
      color: '#3f82d2'
    }
  },
  ({ size: fontSize = 16 } = {}) => ({
    fontSize
  })
);

export const Icon = ({ ...rest }) => <FontIcon {...rest} />;

export default ({ on, icons: [iconOn, iconOff], toggle, ...rest }) => (
  <Icon icon={on ? iconOn : iconOff} onClick={toggle} {...rest} />
);
