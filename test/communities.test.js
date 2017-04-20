var chai = require('chai');
var fetch = require('node-fetch');
var expect = chai.expect;

describe('Get allCommunities', () => {
  var communities;
  before((done) => {
    fetch('http://brain.red-badger.com/graphql?query=%20%20%20%20query%20%7B%0A%20%20%20%20%20%09allCommunities%20%7B%0A%20%20%20%20%20%09%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20mailingListTitle%0A%20%20%20%20%20%20%20%20mailingListSummary%0A%20%20%20%20%20%09%7D%0A%20%20%20%20%7D')
        .then(res => res.json())
        .then(json => {communities = json.data.allCommunities})
        .then(done);
  })
  it('should return a unique id for each community', () => {
                 communities.forEach((community) => {
              communities.forEach((comparisonCommunity) => {
                  if(comparisonCommunity !== community){
                      expect(comparisonCommunity.id).to.not.equal(community.id);
                  }
              })
           })
    })
      it('should return a title for each community', () => {
                 communities.forEach((community) => {
                     expect(!!community.title).to.be.true;
                 })
      })
  });
