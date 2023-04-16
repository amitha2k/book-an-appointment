import React from 'react'

const GlobalContext = React.createContext({
    dateVar: new Date().getDate(),
    setDateVar: (index) => {},
    monthVar: new Date().getMonth(),
    setmonthVar: (mth) => {},
    yearVar: new Date().getFullYear(),
    setYearVar: (yr) => {},
    timeVar: 0,
    setTimeVar: (time) => {},
})

export default GlobalContext