var chai = require('chai');
var fetch = require('node-fetch');
var expect = chai.expect;

describe('Get allSpeakers', () => {
  var speakers;
  before((done) => {
    fetch('http://brain.red-badger.com/graphql?query=%20%20%20%20query%20%7B%0A%20%20%20%20%20%09allSpeakers%20%7B%0A%20%20%20%20%20%20%20%20blogURL%0A%20%20%20%20%20%20%20%20imageURL%0A%20%20%20%20%20%09%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20company%0A%20%20%20%20%20%20%20%20githubHandle%0A%20%20%20%20%20%20%20%20twitterHandle%0A%20%20%20%20%20%20%20%20bio%20%7B%0A%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%09%7D%0A%20%20%20%20%7D')
        .then(res => res.json())
        .then(json => {speakers = json.data.allSpeakers})
        .then(done);
  })
  it('should return the name for all speakers', () => {
      speakers.forEach((speaker) => {
          expect(!!speaker.name).to.be.true;
      })
  })
  it('should return a unique list of speakers', () => {
      speakers.forEach((speaker) => {
            speakers.forEach((comparisonSpeaker) => {
                if(comparisonSpeaker !== speaker){
                    expect(comparisonSpeaker.id, 'Speaker id is a duplicate').to.not.equal(speaker.id);
                    expect(comparisonSpeaker.name, 'Speaker name is a duplicate').to.not.equal(speaker.name);
                }
            })
      })
  })
});
