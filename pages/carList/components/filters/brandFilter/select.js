const select = (brand, server) => ({
  where: `brand=='${brand}'`,
  sort: '_id',
  server
})

// export const defaultSelect = select('Lamborghini')
export default select
