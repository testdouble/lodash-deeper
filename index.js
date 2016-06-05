var _ = require('lodash')

module.exports = {
  filterDeep: function filterDeep (collection, predicate) {
    predicate = predicate || _.identity
    collection = { parent: collection }
    return deeplyFilters(collection, predicate)
  }
}

function deeplyFilters(collection, predicate) {
  if (_.isObject(collection)) {
    return _.filter(collection, predicate).concat(_.flatMap(collection, function (val) {
      return deeplyFilters(val, predicate)
    }))
  } else {
    return []
  }
}
