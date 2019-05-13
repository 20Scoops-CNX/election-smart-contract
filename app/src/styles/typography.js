const createFontSizeStyle = size => () => `
    font-size: ${size}px;
`;

const createFontWeightStyle = weight => () => `
    font-weight: ${weight};
`;

const createFontFamily = (fontFamily, isDefaultFont = true) => () =>
  `font-family: ${fontFamily} ${isDefaultFont ? ', sans-serif' : ''};`;

const createFontFamilyRoboto = (...args) => createFontFamily('Roboto', ...args);

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
  button: createFontStyle(
    createFontFamilyRoboto(),
    createFontSizeStyle(14),
    createFontWeightStyle('bold'),
    createLineHeight('16px'),
    createLetterSpacing('0.1em')
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
  )
};

export default typography;
