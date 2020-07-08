const select = (sortField,isAsc) => carList => {

      return carList.sort((a, b) => isAsc ? a[sortField] - b[sortField] : b[sortField] - a[sortField])
}

export const defaultSelect = select('rank',true)
export default select
