var chai = require('chai');
var fetch = require('node-fetch');
var expect = chai.expect;

describe('Get allQnA', () => {
  var qna;
  before((done) => {
    fetch('http://brain.red-badger.com/graphql?query=%7B%0A%20%20allQnA%20%7B%0A%20%20%20%20name%0A%20%20%20%20slug%0A%20%20%20%20topics%20%7B%0A%20%20%20%20%20%20slug%0A%20%20%20%20%20%20question%0A%20%20%20%20%20%20answer%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D')
        .then(res => res.json())
        .then(json => {qna = json.data.allQnA})
        .then(done);
  })
  it('should not return an empty json object', () => {
    expect(qna, 'empty response returned').to.not.be.empty;
  })
  it('should not return any null values for Question categories', () => {
    qna.forEach((question) => {
      expect(!!question.name, 'missing a category name').to.be.true;
    })
  })
  it('should not return any null values for Questions', () => {
    qna.forEach((question) => {
    expect(!!question.question, 'missing a question').to.be.true;
    })
  })
  it('should not return any null values for Answers', () => {
    qna.forEach((question) => {
    expect(!!question.answer, 'missing an answer').to.be.true;
    })
  })
})
