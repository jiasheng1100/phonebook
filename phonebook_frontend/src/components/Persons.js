import React from 'react'
import Button from './Button'
import personService from '../services/persons'


const Persons = ({newFilter, persons, setPersons}) => {
    const personsToShow = newFilter===''
      ? persons
      : persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)
    return <>
      {personsToShow.map(person => 
      <div className='person' key={person.name}>
        {person.name} {person.number} 
        <Button text={"delete"} handler={deletePerson(person.id, person.name, persons, setPersons)}/>
      </div>)}
    </>
}

const deletePerson = (id, name, persons, setPersons) => (
  (event) => {    
    event.preventDefault() 
    if (window.confirm(`Delete '${name}'?`)){
      personService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(error=>{
          console.log(error)
        })
    }  
  }
)


export default Persons