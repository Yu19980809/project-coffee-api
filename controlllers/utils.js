export const isExist = (value, arr) => {
  let exist = false
  arr.forEach(item => {
    if (item.name === value) {
      exist = true
    }
  })

  return exist
}

export const isOtherExist = (id, value, arr) => {
  let exist = false
  arr.forEach(item => {
    if (item.name === value && item._id.toString() !== id) {
      exist = true
    }
  })

  return exist
}
