const select = (brand, server) => ({
  where: `brand=='${brand}'`,
  sort: 'rank',
  server
})

// export const defaultSelect = select('Lamborghini')
export default select
