import { colors } from '../../src/styles'


function getRandomColor() {
  const colorList = Object.values(colors)

  const randomIndex = Math.floor(Math.random() * colorList.length)

  return colorList[randomIndex][500]
}

export default getRandomColor
