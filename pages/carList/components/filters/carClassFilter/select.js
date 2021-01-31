const select = (carClass, server) => ({
  where: `carClass=='${carClass}'`,
  sort: '_id',
  server
})

export default select
