const flatDeep = function (arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice()
}

const slugify = function (text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

const containsObject = function (obj, list) {
  let i
  for (i = 0; i < list.length; i++) {
    if (list[i].slug === obj.slug) {
      return i
    }
  }
  return -1
}

const formatPrice = (number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number)

const getUniqueValues = (data, type, withAll = 'active') => {
  const unique = data.map((item) => item[type])
  if (withAll === 'active') {
    return ['all', ...new Set(unique)]
  }
  return [...new Set(unique)]
}

const getUniqueValues2 = (data, itemName) => {
  const items = data.map((item) => item.itemName)

  const singleCatArray = flatDeep(items)
  const itemArray = []
  singleCatArray.forEach((cat) => {
    const obj = {
      title: cat.trim(),
      slug: slugify(cat),
      count: 1
    }
    const objIndex = containsObject(obj, itemArray)
    if (objIndex !== -1) {
      const prevCount = itemArray[objIndex].count
      itemArray[objIndex] = {
        title: cat.trim(),
        slug: slugify(cat),
        count: prevCount + 1
      }
    } else {
      itemArray.push(obj)
    }
  })
}

export {
  flatDeep,
  slugify,
  containsObject,
  formatPrice,
  getUniqueValues,
  getUniqueValues2
}
