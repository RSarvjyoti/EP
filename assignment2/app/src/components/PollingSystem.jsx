import React, { useState } from 'react'
import Text from './Text';
import MyButton from './MyButton';

const PollingSystem = () => {
    const [count, setCount] = useState(0);
  return (
    <div>
        <Text count={count} />
        <MyButton count={count} onclick={() => setCount(prev => prev + 1)}/>
    </div>
  )
}

export default PollingSystem