const select = (releaseVersion, server) => ({
  where: `releaseVersion=='${releaseVersion}'`,
  // where:'',
  sort: 'rank',
  server
})

// export const defaultSelect = select('2.2.2')
export default select
