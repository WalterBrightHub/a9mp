const select = (sortField, isAsc, server) => ({
  where: '',
  sort: `${sortField} ${isAsc?'asc':'desc'}`,
  server
})

export default select
