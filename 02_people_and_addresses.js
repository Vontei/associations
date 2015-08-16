var db = require('monk')('localhost/association-objects')
var people = db.get('people')
var employers = db.get('employers')
var addresses = db.get('addresses')



function getAlltheStuff() {
  return people.find({}).then(function (people) {
    return employers.find({}).then(function (employers) {
      return [employers, people]
    })
  })
}




function getBosses(){
  var result = {}
  return people.find({}).then(function (people) {

      return employerIds = people.map(function (e) {
        console.log('this is e' ,e)
        var holder = []
        var stuff = e.employerIds.map(function (b) {
          console.log('THis is ' ,b)
            return b
        })
      }).then(function (thing) {
        console.log('These are the ids' ,employerIds)
        return employers.find({}).then(function () {
      })

    })
  }).then(function (object) {
    console.log(object)
    db.close()
  })
}

getBosses()


function matchTheThings() {
   return getAlltheStuff().then(function (array) {
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
  }).then(function (object) {
    console.log(object)
    db.close()
  })
}



function matchEmployers(){
  return getAlltheStuff().then(function (array) {
    var bosses = array[0]
    var people = array[1]
    people.forEach(function (person) {
      person.employerIds.forEach(function (id) {
        bosses.forEach(function (boss) {
          if(boss._id.toString()===id.toString()){
            person.employers= boss.name
          }
        })
    })
  })
    return people
  }).then(function (object) {
    console.log(object)
    db.close()
  })
}

matchEmployers()
