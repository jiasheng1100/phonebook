const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.kytfqgm.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
    if (process.argv.length === 3) {
      Person
        .find({})
        .then(result => {
          result.forEach(person => {
            console.log(person)
          })
          mongoose.connection.close()
        })
    }
    else if (process.argv.length === 5)
    {
      const name_ = process.argv[3]
      const number_ = process.argv[4]
      const person = new Person({
        name: `${name_}`,
        number: `${number_}`,
      })
      person.save().then(() => {
        console.log(`added ${name_} number ${number_} to phonebook`)
        mongoose.connection.close()
      })
    }
  })
  .catch((err) => console.log(err))
