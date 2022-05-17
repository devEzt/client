import React, { createContext, useState } from 'react'

export const createData = createContext('')
export const editData = createContext('')
export const deleteData = createContext('')

const ContextProvider = ({ children }) => {
  const [fdata, setFData] = useState('')
  const [upData, setUpData] = useState('')
  const [deletData, setDeletData] = useState('')

  return (
    <createData.Provider value={{ fdata, setFData }}>
      <editData.Provider value={{ upData, setUpData }}>
        <deleteData.Provider value={{ deletData, setDeletData }}>{children}</deleteData.Provider>
      </editData.Provider>
    </createData.Provider>
  )
}

export default ContextProvider
