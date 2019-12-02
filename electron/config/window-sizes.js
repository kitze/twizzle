module.exports = {
  small: ({ width, height }) => ({
    width: 385,
    height: Math.round(height * 0.9)
  }),
  large: ({ width, height }) => {
    let maxWidth = 1030;
    let maxHeight = 850;
    let widthPercent = Math.round(width * 0.85);
    let heightPercent = Math.round(height * 0.9);

    return {
      width: widthPercent > maxWidth ? maxWidth : widthPercent,
      height: heightPercent > maxHeight ? maxHeight : heightPercent
    };
  }
};
