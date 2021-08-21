import {STYLES} from '../../config/constants';

export const rowBetweenCenter = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const rowCenterCenter = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

export const layout = {
  rowCenterCenter,
  rowBetweenCenter,
};

export const sizes = {
  xxs: 2,
  xs: 3,
  sm: 5,
  md: 10,
  lg: 15,
  xl: 20,
  xxl: 30,
};

export const fontSizes = {
  xxm: 8,
  xm: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
};

export const margins = {
  mlxxs: sizes.xxs,
  mlxs: sizes.xs,
  mlsm: sizes.sm,
  mlmd: sizes.md,
  mllg: sizes.lg,
  mlxl: sizes.xl,
  mlxxl: sizes.xxl,
};

export const getSquare = (base = 1, {round = false} = {}) => {
  const res = {
    height: sizes.sm * base,
    width: sizes.sm * base,
  };
  if (round) {
    res.borderRadius = (sizes.sm * base) / 2;
  }
  return res;
};

export const getMargins = (
  type = STYLES.margins.ma,
  size = STYLES.sizes.md,
) => {
  if (type === STYLES.margins.ml) {
    return {marginLeft: sizes[size]};
  } else if (type === STYLES.margins.mr) {
    return {marginRight: sizes[size]};
  } else if (type === STYLES.margins.mx) {
    return {marginLeft: sizes[size], marginRight: sizes[size]};
  } else if (type === STYLES.margins.mt) {
    return {marginTop: sizes[size]};
  } else if (type === STYLES.margins.mb) {
    return {marginBottom: sizes[size]};
  } else if (type === STYLES.margins.my) {
    return {marginTop: sizes[size], marginBottom: sizes[size]};
  } else {
    return {margin: sizes[size]};
  }
};
