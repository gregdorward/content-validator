var chai = require('chai');
var fetch = require('node-fetch');
var expect = chai.expect;

describe('Get allBadgers', () => {
  var badgers;
  before((done) => {
    fetch('http://brain.red-badger.com/graphql?query=%20%20%20%20query%20%7B%0A%20%20%20%20%20%20allBadgers%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20firstName%0A%20%20%20%20%20%20%20%20lastName%0A%20%20%20%20%20%20%20%20order%0A%20%20%20%20%20%20%20%20jobTitle%0A%20%20%20%20%20%20%20%20primaryImageUrl%0A%20%20%20%20%20%20%20%20secondaryImageUrl%0A%20%20%20%20%20%20%20%20startDate%0A%20%20%20%20%20%20%20%20about%0A%20%20%20%20%20%20%20%20skills%0A%20%20%20%20%20%20%20%20influence%0A%20%20%20%20%20%20%20%20achievements%0A%20%20%20%20%20%20%20%20linkedin%0A%20%20%20%20%20%20%20%20github%0A%20%20%20%20%20%20%20%20twitter%0A%20%20%20%20%20%20%20%20squarespaceId%0A%20%20%20%20%20%20%20%20categories%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20%20%20order%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D')
        .then(res => res.json())
        .then(json => {badgers = json.data.allBadgers})
        .then(done);
  })
        it('should return first names and surnames of all Badgers', () => {
            badgers.forEach((badger) => {
                expect(!!badger.firstName).to.be.true;
                expect(!!badger.lastName).to.be.true;
        });
              });
        it('should not return duplicate badgers', () => {
              badgers.forEach((badger) => {
                  badgers.forEach((comparisonBadger) => {
                      if(comparisonBadger !== badger){
                          expect(comparisonBadger.slug).to.not.equal(badger.slug);
                  }
              });
           });
        });
        it('should return an order attribute for Cain, Stuart, David and Milo', () => {
            badgers.forEach((badger) => {
                if(badger.slug === 'cain-ullah' ||
                badger.slug === 'stuart-harris' ||
                badger.slug === 'david-wynne' ||
                badger.slug === 'milo-castro'){
                    expect(!!badger.order).to.be.true;
                }
            });
        });
        it('should return a category for every Badger', () => {
            badgers.forEach((badger) => {
                expect(!!badger.categories[0].slug).to.be.true;
            })
        })
        it('should only serve images from Prismic', () => {
            badgers.forEach((badger) => {
                expect(badger.primaryImageUrl).to.contain('https://prismic-io.s3.amazonaws.com');
                expect(badger.primaryImageUrl).to.not.contain('cloudinary');
            });
        });
        it('should return an "about" blurb', () => {
             badgers.forEach((badger) => {
                 expect(!!badger.about).to.be.true;
             });
        });
        it('should return a category for each Badger', () => {
            badgers.forEach((badger) => {
                expect(!!badger.categories[0].slug).to.be.true;
            });
        });
        it('should return a job title for each Badger', () => {
            badgers.forEach((badger) => {
                expect(!!badger.jobTitle).to.be.true;
                expect(badger.jobTitle).to.be.a('string');
            });
        });
        it('should return a start date for each Badger', () => {
            badgers.forEach((badger) => {
                expect(!!badger.startDate).to.be.true;
            });
        });
        it('should return the correct social media accounts under the correct headings', () => {
            badgers.forEach((badger) => {
                if(!!badger.linkedin === true) {
                expect(badger.linkedin, 'In Badger ' + badger.slug).to.contain('linkedin');
                }
                if(!!badger.github === true) {
                expect(badger.github, 'In Badger ' + badger.slug).to.contain('github');
                }
                if(!!badger.twitter === true) {
                expect(badger.twitter, 'In Badger ' + badger.slug).to.contain('twitter');
                }
            });

            })

  });
