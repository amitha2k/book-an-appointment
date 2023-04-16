import React, {useState} from 'react'
import GlobalContext from './GlobalContext'

export default function ContextWrapper(props) {
    const [dateVar, setDateVar] = useState(new Date().getDate());
    const [monthVar, setMonthVar] = useState(new Date().getMonth());
    const [yearVar, setYearVar] = useState(new Date().getFullYear());
    const [timeVar, setTimeVar] = useState(0);
    return (
        <div>
            <GlobalContext.Provider
                value={{
                    dateVar,
                    setDateVar,
                    timeVar,
                    setTimeVar,
                    monthVar,
                    setMonthVar,
                    yearVar,
                    setYearVar,
                    }}>
                {props.children}
            </GlobalContext.Provider>
        
        </div>
    )
}
