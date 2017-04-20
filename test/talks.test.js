var chai = require('chai');
var fetch = require('node-fetch');
var expect = chai.expect;

describe('Get alltalks', () => {
  var talks;
  before((done) => {
    fetch('http://brain.red-badger.com/graphql?query=%7BallTalks%20%7B%0A%20%20id%0A%20%20title%0A%20%20summary%0A%20%20speakers%20%7B%0A%20%20%20%20id%0A%20%20%7D%0A%7D%7D')
        .then(res => res.json())
        .then(json => {talks = json.data.allTalks})
        .then(json => {speakers = talks.speakers})
        .then(done);
  })
  describe('Get all talks', () => {
    it('should return ids for each talk', () => {
        talks.forEach((talk) => {
            expect(!!talk.id).to.be.true;
        })
    })
    it('should return a title for each talk', () => {
        talks.forEach((talk) => {
            expect(!!talk.title).to.be.true;
        })
    })
    it('should return a summary of each talk', () => {
         talks.forEach((talk) => {
            expect(!!talk.summary, 'Summary missing in ' + talk.title + ' ').to.be.true;
            })
    })
    it('should return a speaker for each talk', () => {
        talks.forEach((talk) => {
            expect(talk.speakers).to.be.an.object;
            })
    })
})
})
