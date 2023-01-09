import personService from '../services/persons'

const addPerson = (persons, newName, newNum, setNewName, setNewNum, setPersons, setMessage) => 
  (event) => {    
    event.preventDefault() 

    //check if the user entered name already exists in phonebook
    let personIndex = persons.findIndex(person => person.name===newName)
    if (personIndex !== -1){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const changedPerson = {...persons[personIndex], number: newNum}
        personService
          .update(changedPerson.id, changedPerson)
          .then(response =>{
            setPersons(persons.map(person => person.id === changedPerson.id ? response : person))
            setNewName('')
            setNewNum('')
            setMessage(`Updated '${newName}'`)        
            setTimeout(() => { setMessage(null) }, 1500)
          })
          .catch(error => {
            setMessage(`An error occurred while saving the person '${changedPerson.name}'`)
            setPersons(persons.filter(p => p.id !== changedPerson.id))
            setTimeout(() => { setMessage(null) }, 1500)
          })
          return    
      }
    }
   
    // if the user entered name does not exist in phonebook
    const personObject = {
      name: newName,
      number: newNum
    } 

    //save the added person object to backend server
    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNum('')  
      setMessage(`Added '${newName}'`)
      setTimeout(() => { setMessage(null) }, 1500)  
    })
    .catch(error => {
      setMessage(error.response.data.error)
      setPersons(persons.filter(p => p.name !== newName))
      setTimeout(() => { setMessage(null) }, 1500)
    })    
  }

export default addPerson