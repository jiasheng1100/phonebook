import React from 'react'

const Form = ({text, value, setter}) => (
    <div> {text}: 
      <input 
        value={value}
        //an event handler that synchronizes the changes made to input with the component's state
        //in order to enable editing of the input element
        onChange={handleChange(setter)} //called every time a change occurs in input element
      />
    </div>
)

const handleChange = (setter) => (
  (event) => { setter(event.target.value) }
)

export default Form