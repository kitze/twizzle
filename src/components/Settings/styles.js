import emotion from '@emotion/styled';
import flex from '../../styles/flex';

const absolute = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 9999,
  width: '100vw',
  height: '100vh'
};

export const Settings = emotion('div')(
  {
    ...flex.vertical,
    ...flex.centerVertical,
    flex: 1,
    opacity: 0,
    transition: 'all 150ms linear'
  },
  absolute,
  ({ show }) => ({
    ...(show && {
      opacity: 1
    }),
    ...(!show && {
      pointerEvents: 'none'
    })
  })
);

export const Overlay = emotion('div')(
  {
    flex: 1,
    width: '100%',
    height: '100%',
    ...flex.vertical,
    ...flex.centerVertical,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  absolute
);

export const Inside = emotion('div')({
  ...flex.vertical,
  ...flex.centerVerticalV,
  flex: 1,
  padding: 20
});

export const Content = emotion('div')(
  {
    ...flex.vertical,
    margin: 20,
    zIndex: 9999
  },
  ({ theme }) => theme.dialog.Content
);
