var chai = require('chai');
var fetch = require('node-fetch');
var expect = chai.expect;

describe('Get organisation', () => {
  var organisation;
  before((done) => {
    fetch('http://brain.red-badger.com/graphql?query=%7B%0A%20%20organisation(id%3A%20%22WLBSsSYAAOITlpz7%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20careerBrief%0A%20%20%20%20url%0A%20%20%20%20partnerURL%0A%20%20%20%20imageURL%0A%20%20%20%20jobs%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20location%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20jobURL%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A')
        .then(res => res.json())
        .then(json => {organisation = json.data.organisation})
        .then(json => {jobs = organisation.jobs})
        .then(done);
  })
      it('should return name of each organisation', () => {
              expect(!!organisation.name).to.be.true;
      });
      it('should return description for each organisation', () => {
              expect(!!organisation.description).to.be.true;
      });
      it('should return a url for each organisation', () => {
          expect(!!organisation.url).to.be.true;
      });
      it('should return a list of jobs at the organisation', () => {
          if(Object.keys(organisation.jobs).length !== 0){
          jobs.forEach((job) => {
              expect(!!job.title).to.be.true;
              expect(!!job.location).to.be.true;
              expect(!!job.description).to.be.true;
              expect(!!job.jobURL).to.be.true;
          });
          }
      });
  });
