const express = require('express')
const morgan = require('morgan')  
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

//log request data to console
morgan.token('data', function getData(req) { return JSON.stringify(req.body) })

const app = express()

// json parser middleware (has to be among the very first loaded middleware)
app.use(express.json())

//To make express show static content, index.html and JavaScript it fetches
app.use(express.static('build'))

//use morgan middleware for logging
app.use(morgan('tiny'))
app.use(morgan(':data'))

//use cors middleware to allow requests from all origins
app.use(cors())

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`Phonebook has info for ${persons.length} people \n ${new Date()}` )
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }else{
        response.status(404).end()  // 404 Bad Request
      }})
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()  // 204 no content
    })
    .catch(error => next(error))
  })

app.post('/api/persons', (request, response) => {  
  const body = request.body
  //if the name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  //if the name already exists in the phonebook
  // Person.find({}).then(persons => {
  //   if (persons.find(person => person.name === body.name)){
  //     return response.status(400).json({
  //       error: 'name must be unique'
  //     })
  //   }else{
  //     const person = new Person({
  //       name: body.name,
  //       number: body.number
  //     })
  //     person.save().then(savedPerson => {
  //       response.json(savedPerson)
  //     })
  //   }
  // }) 
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// handler of requests with unknown endpoint (has to be second last loaded)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// handler of requests with result to errors (has to be the last loaded middleware.)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT||"8080";
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
