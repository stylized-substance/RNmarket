import { products } from '../../data/data.json'

const findCommonProperties = () => {
  const categories = products.map(product => product.category)
  const uniqueCategories = [...new Set(categories)]

  // const mobiles = products.filter(product => product.category === 'Mobiles')
  // const books = products.filter(product => product.category === 'Books')
  // const clothings = products.filter(product => product.category === 'Clothings')
  // const beauty = products.filter(product => product.category === 'Beauty')
  // const furniture = products.filter(product => product.category === 'Furniture')
  // const laptops = products.filter(product => product.category === 'Laptops')

    // uniqueCategories.forEach((category) => {
  //   const productsInCategory = products.filter((product) => product.category === category)
  //   console.log(productsInCategory.length)
  // })

  // console.log()
  // const allProperties = products.map(product => Object.keys(product))
  console.log(uniqueCategories)
}

findCommonProperties()

export default findCommonProperties