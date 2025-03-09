import React from 'react'

const MyButton = ({count, onclick}) => {
  return (
    <div style={{cursor:"pointer", padding:"5px", border:"0.5px"}} onClick={onclick}>Click : {count}</div>
  )
}

export default MyButton