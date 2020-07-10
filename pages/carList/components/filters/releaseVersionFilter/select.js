const select = releaseVersion => carList => {
  return carList.filter(car => car.releaseVersion === releaseVersion)
    .sort((a, b) => a.rank - b.rank)
}

// export const defaultSelect = select('2.2.2')
export default select
