import { useState, useEffect } from 'react'
import Form from './components/Form'
import Persons from './components/Persons'
import addPerson from './components/addPerson'
import Button from './components/Button'
import Notification from './components/Notification'
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
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Form text={"Filter phonebook with"} value={newFilter} setter={setNewFilter} />      
      <h3>Add</h3>
      <form>
        <Form text={"name"} value={newName} setter={setNewName} />
        <Form text={"number"} value={newNum} setter={setNewNum} />
        <Button text={"add"} handler={addPerson(persons, newName, newNum, setNewName, setNewNum, setPersons, setMessage)} />
      </form>
      <h3>Numbers</h3>
        <Persons newFilter={newFilter} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App
