import React from 'react'

const GlobalContext = React.createContext({
    dateVar: new Date().getDate(),
    setDateVar: (index) => {},
    timeVar: 0,
    setTimeVar: (time) => {},
})

export default GlobalContext