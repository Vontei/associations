var db = require('monk')('localhost/association-objects')
var people = db.get('people')
var employers = db.get('employers')
var addresses = db.get('addresses')

function doStuff() {
  return people.find({}).then(function (people) {
    // if you return a promise from this function
    // then the next function passed to "then" will get passed the data from the _resolved_ promise

    // if you return anything _but_ a promise, it will just call the next function immediately (before the promise has resolved)
    return addresses.find({}).then(function (addresses) {
      return [addresses, people]
    })
  })
}

function doMoreStuff() {
   return doStuff().then(function (array) {
    var addresses = array[0]
    var people = array[1]
      addresses.forEach(function (address) {
        people.forEach(function (person) {
          if(address._id.toString()===person.addressId.toString()){
            person.address = address
          }
        })
      })
      return people
  })
}



doMoreStuff().then(function (bigOldObject) {
  console.log(bigOldObject);
   // should be an array of people, each with a .address set to the correct address
  db.close()
})
