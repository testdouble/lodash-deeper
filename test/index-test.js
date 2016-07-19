var _ = require('../index')
var assertEquals = require('./support/assert-equals')
var nestedFilteredPair = require('./support/generate-nested-and-expected-filtered-object-pair')

var sample
var expected
module.exports = {
  beforeEach: function () {
    var pair = nestedFilteredPair()
    sample = pair.nestedObject
    expected = pair.filterResult
  },
  filtersStuff: function () {
    var result = _.filterDeep(sample, ['color', 'red'])
    assertEquals(result, expected)
  },
  uniqVisited: function () {
    sample.loop = { uhOh: sample }
    expected.push(sample)
    var result = _.filterDeep(sample, ['color', 'red'])
    assertEquals(result, expected)
  }
}
