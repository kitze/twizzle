import omit from 'lodash/omit';

export const importStore = ({ nightMode, ...rest }) => {
  return {
    nightMode: nightMode === 'true' || nightMode === true,
    ...rest
  };
};

export const exportStore = s => omit(s, 'showSettings', 'isAuthed', 'url');
