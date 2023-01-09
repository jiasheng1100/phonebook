import { useState, useEffect } from 'react'
import Form from './components/Form'
import Persons from './components/Persons'
import addPerson from './components/addPerson'
import Button from './components/Button'
import Notification from './components/Notification'
import Footer from './components/Footer'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') //user input name
  const [newNum, setNewNum] = useState('') //user input number
  const [newFilter, setNewFilter] = useState('') //user input filter string
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => { setPersons(initialPersons) })
  }, [])

  return (
    <div className='app'>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Form text={"Search for"} value={newFilter} setter={setNewFilter} />      
      <h3>Add to Phonebook</h3>
      <form>
        <Form text={"Name"} value={newName} setter={setNewName} />
        <Form text={"Number"} value={newNum} setter={setNewNum} />
        <Button text={"Add"} handler={addPerson(persons, newName, newNum, setNewName, setNewNum, setPersons, setMessage)} />
      </form>
      <h3>Numbers in Phonebook</h3>
        <Persons newFilter={newFilter} persons={persons} setPersons={setPersons} />
        <Footer />
    </div>
  )
}

export default App
