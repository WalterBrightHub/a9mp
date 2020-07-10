const select = brand => carList => {
  return carList.filter(car => car.brand === brand)
    .sort((a, b) => a.rank - b.rank)
}

// export const defaultSelect = select('Lamborghini')
export default select
