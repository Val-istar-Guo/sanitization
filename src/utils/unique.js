export default array => {
  const tmp = [];//临时数组

  array.forEach(item => {
    if (tmp.indexOf(item) === -1) tmp.push(item)
  })

  return tmp
}
