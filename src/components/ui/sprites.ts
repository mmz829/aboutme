/** すべてオリジナルのドット絵データ（1文字 = 1ドット、"." は透明） */

export const heroSprite = {
  rows: [
    '..................',
    '.....kkkkkk....k..',
    '....khhhhhhk..kGk.',
    '...khHHhhhhhkkGWGk',
    '..khhHhhhhhffkkGk.',
    '..khhsshhsshhkfff.',
    '..khskksskkshk.b..',
    '..khsewssewshk.b..',
    '..khsrssssrshk.b..',
    '..khsssmmssshk.b..',
    '..khhsssssshhk.b..',
    '..khcffwwffchk.b..',
    '.kcchjjffjjhcckb..',
    '.kccjjjjjjjjccksk.',
    '.kcsjjjjjjjjscksk.',
    '.kccbbbfbbbbcckb..',
    '.kcjjjjjjjjjjckb..',
    '...kdddkkdddk..b..',
    '...kOOOkkOOOk..b..',
    '..kooookkooook.b..',
    '..kkkkkkkkkkkk.k..',
  ],
  palette: {
    k: '#14112b',
    h: '#4a3272',
    H: '#7a5bb5',
    s: '#f6d0a8',
    e: '#2b2350',
    w: '#f4eedf',
    r: '#f4a0a0',
    m: '#c85a64',
    f: '#f5c451',
    j: '#2c8c86',
    c: '#b8434e',
    b: '#8a5a34',
    d: '#2a3566',
    O: '#c98a4b',
    o: '#5a3a22',
    G: '#5eead4',
    W: '#e8fffb',
  },
};

const chestPalette = {
  k: '#14112b',
  b: '#a0643a',
  G: '#f5c451',
  d: '#3a2415',
  y: '#fff3b0',
};

export const chestClosed = {
  rows: [
    '..kkkkkkkk..',
    '.kbbbbbbbbk.',
    'kbbbbbbbbbbk',
    'kGGGGGGGGGGk',
    'kbbbbGGbbbbk',
    'kbbbbGkbbbbk',
    'kbbbbbbbbbbk',
    'kGGGGGGGGGGk',
    'kbbbbbbbbbbk',
    '.kkkkkkkkkk.',
  ],
  palette: chestPalette,
};

export const chestOpen = {
  rows: [
    '.kkkkkkkkkk.',
    'kddddddddddk',
    'kbbbbbbbbbbk',
    '.kkkkkkkkkk.',
    'kyyGyyyGyyyk',
    'kGGGGGGGGGGk',
    'kbbbbGGbbbbk',
    'kbbbbbbbbbbk',
    'kGGGGGGGGGGk',
    '.kkkkkkkkkk.',
  ],
  palette: chestPalette,
};
