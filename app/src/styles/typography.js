const createFontSizeStyle = size => () => `
    font-size: ${size}px;
`;

const createFontWeightStyle = weight => () => `
    font-weight: ${weight};
`;

const createFontFamily = (fontFamily, isDefaultFont = true) => () =>
  `font-family: ${fontFamily} ${isDefaultFont ? ', sans-serif' : ''};`;

const createFontFamilyNotoSansThai = (...args) =>
  createFontFamily("'Noto Sans Thai'", ...args);

const createFontFamilyAnton = (...args) => createFontFamily('Anton', ...args);

const createFontFamilyNotoSans = (...args) =>
  createFontFamily('Noto Sans', ...args);

const createLineHeight = lineheight => () => `line-height: ${lineheight};`;

const createLetterSpacing = letterSpacing => () =>
  `letter-spacing: ${letterSpacing};`;

const createFontStyle = (...fontStyleFns) => () => `
    ${fontStyleFns.map(fontStyleFn => fontStyleFn()).join('')}
`;

const typography = {
  headline: createFontStyle(
    createFontFamilyAnton(),
    createFontSizeStyle(48),
    createFontWeightStyle('normal'),
    createLineHeight('70px')
  ),
  title: createFontStyle(
    createFontFamilyAnton(),
    createFontSizeStyle(24),
    createFontWeightStyle('normal'),
    createLineHeight('33px')
  ),
  subTitle: createFontStyle(
    createFontFamilyAnton(),
    createFontSizeStyle(18),
    createFontWeightStyle('normal'),
    createLineHeight('26px')
  ),
  caption: createFontStyle(
    createFontFamilyAnton(),
    createFontSizeStyle(14),
    createFontWeightStyle('normal'),
    createLineHeight('21px'),
    createLetterSpacing('0.05em')
  ),
  captionSmall: createFontStyle(
    createFontFamilyNotoSans(),
    createFontSizeStyle(8),
    createFontWeightStyle('normal'),
    createLineHeight('11px')
  ),
  titleContent: createFontStyle(
    createFontFamilyNotoSansThai(),
    createFontSizeStyle(18),
    createFontWeightStyle('bold'),
    createLineHeight('21px')
  ),
  subTitleContent: createFontStyle(
    createFontFamilyNotoSansThai(),
    createFontSizeStyle(12),
    createFontWeightStyle('normal'),
    createLineHeight('14px')
  ),
  titleSmallContent: createFontStyle(
    createFontFamilyAnton(),
    createFontSizeStyle(16),
    createFontWeightStyle('normal'),
    createLineHeight('23px')
  ),
  textSmallContent: createFontStyle(
    createFontFamilyAnton(),
    createFontSizeStyle(12),
    createFontWeightStyle('normal'),
    createLineHeight('18px')
  ),
  button: createFontStyle(
    createFontFamilyAnton(),
    createFontSizeStyle(14),
    createFontWeightStyle('normal'),
    createLineHeight('21px'),
    createLetterSpacing('0.05em')
  )
};

export default typography;
