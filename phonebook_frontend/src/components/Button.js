import React from 'react'

const Button = ({handler, text}) => (  
    <button onClick={handler}>{text}</button>
  )

export default Button