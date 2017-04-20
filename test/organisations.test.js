var chai = require('chai');
var fetch = require('node-fetch');
var expect = chai.expect;

describe('Get allOrganisations', () => {
  var organisations;
  before((done) => {
    fetch('http://brain.red-badger.com/graphql?query=%7BallOrganisations%7B%0A%20%20id%0A%20%20name%0A%20%20description%0A%20%20careerBrief%0A%20%20url%0A%20%20partnerURL%0A%20%20imageURL%0A%20%20jobs%20%7B%0A%20%20%20%20title%0A%20%20%20%20location%0A%20%20%20%20description%0A%20%20%20%20jobURL%0A%20%20%7D%0A%7D%7D')
        .then(res => res.json())
        .then(json => {organisations = json.data.allOrganisations})
        .then(done);
  })
  it('should return a name for all organisations', () => {
      organisations.forEach((organisation) => {
          expect(!!organisation.name).to.be.true;
      })
  })
  it('should return a url for all organisations', () => {
      organisations.forEach((organisation) => {
          expect(!!organisation.url).to.be.true;
      })
  })
//   To be used once the cutover to Prismic has happened
//   it('should not contain any cloudinary linked images', () => {
//       organisations.forEach((organisation) => {
//             expect(organisation.imageURL).to.not.include('cloudinary');
//       })
//   })
});
