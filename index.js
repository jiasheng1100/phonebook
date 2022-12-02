const express = require('express')
const morgan = require('morgan')  
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

//log request data to console
morgan.token('data', function getData(req) { return JSON.stringify(req.body) })

const app = express()

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
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    // 204 no content
    response.status(204).end()
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
  Person.find({}).then(persons => {
    if (persons.find(person => person.name === body.name)){
      return response.status(400).json({
        error: 'name must be unique'
      })
    }else{
      const person = new Person({
        name: body.name,
        number: body.number
      })
      person.save().then(savedPerson => {
        response.json(savedPerson)
      })
    }
  }) 
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT||"8080";
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
