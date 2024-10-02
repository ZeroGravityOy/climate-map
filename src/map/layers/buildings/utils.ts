export const getEnergyEfficiencyColor=(color: string) => {
  switch (color) {
    case "A":
      return '#1F964A'
    case "B":
      return '#7DAD46'
    case "C":
      return '#CCD040'
    case "D":
      return '#FFEA43'
    case "E":
      return '#ECB234'
    case "F":
      return '#D2621F'
    case "G":
      return '#C70016'
    default:
      return '#000000'
  }
}
