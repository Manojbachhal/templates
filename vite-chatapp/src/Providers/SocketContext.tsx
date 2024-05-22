import React, { useState } from 'react'
import { createContext } from 'react'

export const mySocketContext = createContext()
function SocketContext({children}:any) {
    const [state,setState]=useState("test");
  return (
    <mySocketContext.Provider value={state}>
        {children}
    </mySocketContext.Provider>
  )
}

export default SocketContext