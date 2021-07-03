export const widths = {
  full: {
    name: 'full',
    val: '1 / -1'
  },
  container: {
    name: 'container',
    val: '2 / 14'
  },
  halfLeft: {
    name: 'halfLeft',
    val: '2/ span 6'
  },
  halfRight: {
    name: 'halfRight',
    val: 'span 6 / 14'
  },
  quarterLeft: {
    name: 'quarterLeft',
    val: '2/ span 3'
  },
  quarterCenterLeft: {
    name: 'quarterCenterLeft',
    val: '5 / span 3'
  },
  quarterCenterRight: {
    name: 'quarterCenterRight',
    val: '8 / span 3'
  },
  quarterRight: {
    name: 'quarterRight',
    val: 'span 3 / 14'
  },
  threeQuarterLeft: {
    name: 'threeQuarterLeft',
    val: '2 / span 9'
  },
  threeQuarterRight: {
    name: 'threeQuarterRight',
    val: 'span 9 / 14'
  },
  thirdLeft: {
    name: 'thirdLeft',
    val: '2 / span 4'
  },
  thirdCenter: {
    name: 'thirdCenter',
    val: '6 / span 4'
  },
  thirdRight: {
    name: 'thirdRight',
    val: 'span 4 / 14'
  },
  firstFifth: {
    name: 'firstFifth',
    val: '3 / span 2'
  },
  secondFifth: {
    name: 'secondFifth',
    val: '5 / span 2'
  },
  thirdFifth: {
    name: 'thirdFifth',
    val: '7 / span 2'
  },
  fourthFifth: {
    name: 'fourthFifth',
    val: '9 / span 2'
  },
  fifthFifth: {
    name: 'fifthFifth',
    val: '11 / span 2'
  }
}

export const widthField = {
  component: 'select',
  name: 'width',
  label: 'Width',
  options: [
    {
      value: widths.container.name,
      label: 'Main Container'
    },
    {
      value: widths.full.name,
      label: 'Full width'
    },
    {
      value: widths.halfLeft.name,
      label: 'Half width, left aligned'
    },
    {
      value: widths.halfRight.name,
      label: 'Half width, right aligned'
    },
    {
      value: widths.quarterLeft.name,
      label: 'Quarter width, left aligned'
    },
    {
      value: widths.quarterCenterLeft.name,
      label: 'Quarter width, center left aligned'
    },
    {
      value: widths.quarterCenterRight.name,
      label: 'Quarter width, center right aligned'
    },
    {
      value: widths.quarterRight.name,
      label: 'Quarter width, right aligned'
    },
    {
      value: widths.threeQuarterLeft.name,
      label: 'Three quarters width, left aligned'
    },
    {
      value: widths.threeQuarterRight.name,
      label: 'Three quarters width, right aligned'
    },
    {
      value: widths.thirdLeft.name,
      label: 'One Third width, left aligned'
    },
    {
      value: widths.thirdCenter.name,
      label: 'One Third width, center aligned'
    },
    {
      value: widths.thirdRight.name,
      label: 'One Third width, right aligned'
    }
  ]
}

export const paddingField = {
  name: 'padding',
  component: 'select',
  label: 'Content padding',
  description: 'Select amount of padding for the content',
  options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96]
}

export const heightField = {
  name: 'height',
  component: 'string',
  label: 'Component Height',
  description: 'Enter the height'
}
