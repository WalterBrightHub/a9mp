const select = carClass => carList => {
  return carList.filter(car => car.carClassAL === carClass)
    .sort((a, b) => a.rank - b.rank)
}

export const defaultSelect = select('D')
export default select
