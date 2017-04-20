var chai = require('chai');
var fetch = require('node-fetch');
var expect = chai.expect;

describe('Get allQnA', () => {
  var qna;
  before((done) => {
    fetch('http://brain.red-badger.com/graphql?query=%7B%0A%20%20allQnA%20%7B%0A%20%20%20%20name%0A%20%20%20%20slug%0A%20%20%20%20topics%20%7B%0A%20%20%20%20%20%20slug%0A%20%20%20%20%20%20question%0A%20%20%20%20%20%20answer%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A')
        .then(res => res.json())
        .then(json => {qna = json.data.allQnA})
        .then(done);
  })
//   it('should not return any null values for Question categories', () => {
//     expect(!!questionCategories.name).to.be.true;
// })
//TODO Add test to make sure that Question Categories should not contain empty questions or answers
})
