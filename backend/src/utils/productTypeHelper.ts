import { products } from '../../data/data.json'
import _ from 'lodash'

const findCommonProperties = () => {
  const productProperties = products.map(product => Object.keys(product))
  const commonProperties = _.intersection(...productProperties)
  return commonProperties
}

const findExtraPropertiesForCategory = (category: string) => {
  const commonProperties = findCommonProperties()
  const categoryContents = products.filter(product => product.category === category)
  const categoryContentsProperties = _.uniq(categoryContents.map(product => Object.keys(product)).flat())
  const extraProperties = _.difference(categoryContentsProperties, commonProperties)
  return [ commonProperties, extraProperties ]
}

console.log(findExtraPropertiesForCategory('Laptops'))

export default findCommonProperties