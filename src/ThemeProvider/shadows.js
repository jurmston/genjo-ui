export const popperShadow = `0 0 0 1px rgb(136 152 170 / 10%), 0 15px 35px 0 rgb(49 49 93 / 10%), 0 5px 15px 0 rgb(0 0 0 / 8%)`

export const shadows = [
  'none',
  `0 0 #000,0 0 #000,0 1px 2px 0 rgba(0,0,0,0.05)`,
  `0 0 #000,0 0 #000,0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)`,
  `0 0 #000,0 0 #000,0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)`,
  `0 0 #000,0 0 #000,0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)`,
  `0 0 #000,0 0 #000,0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)`,
  `0 0 #000,0 0 #000,0 25px 50px -12px rgba(77, 72, 72, 0.25)`,
  // Adding levels to 24 for use with @mui elevation prop on menus and raised cards
  // Same as popper shadow below
  ...Array.from({ length: 18 }).map(() => popperShadow),
]

