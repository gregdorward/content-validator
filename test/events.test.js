var chai = require('chai');
var fetch = require('node-fetch');
var expect = chai.expect;

describe('Get allEvents', () => {
  var events;
  before((done) => {
    fetch('https://brain.red-badger.com/graphql?query=%20%20%20%20query%20%7B%0A%20%20%20%20%20%20allEvents%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20tags%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20strapline%0A%20%20%20%20%20%20%20%20internalLinks%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20externalLinks%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20body%20%7B%0A%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20featureImageFilename%0A%20%20%20%20%20%20%20%20startDateTime%20%7B%0A%20%20%20%20%20%20%20%20%20%20iso%0A%20%20%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20%20%20month%0A%20%20%20%20%20%20%20%20%20%20monthSym%0A%20%20%20%20%20%20%20%20%20%20year%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20endDateTime%20%7B%0A%20%20%20%20%20%20%20%20%20%20iso%0A%20%20%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20%20%20month%0A%20%20%20%20%20%20%20%20%20%20monthSym%0A%20%20%20%20%20%20%20%20%20%20year%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A')
        .then(res => res.json())
        .then(json => {events = json.data.allEvents})
        .then(done);
  })
  it('should return titles for each event', () => {
     events.forEach((event) => {
         expect(!!event.title).to.be.true;
     })
 })
 it('should return strapline for each event', () => {
     events.forEach((event) => {
         expect(!!event.strapline).to.be.true;
     })
 })
 it('should return unique slugs', () => {
      events.forEach((event) => {
         events.forEach((comparisonEvent) => {
             if(comparisonEvent !== event){
                 expect(!!event.slug).to.be.true;
                 expect(comparisonEvent.slug, event.slug + ' is a duplicate slug').to.not.equal(event.slug);
             }
         })
      })
 })
 it('should return a start date for each event', () => {
     events.forEach((event) => {
         expect(!!event.startDateTime).to.be.true;
         expect(!!event.startDateTime.iso).to.be.true;
     })
 })
 it.only('should return images from Prismic', () => {
   events.forEach((event) => {
     expect(event.featureImageFilename).to.contain('prismic');
     expect(event.featureImageFilename).to.not.contain('cloudinary');
   })
 })
})
