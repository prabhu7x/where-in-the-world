import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(()=>{
    if(darkMode){
      document.body.classList.add('dark-mode')
    }else {
      document.body.classList.remove('dark-mode')
    }
  },[darkMode])
  return (
    <header>
      <h1>Where in the world?</h1>
      <button onClick={()=>setDarkMode(!darkMode)}>
        <FontAwesomeIcon icon={faMoon} />
        <span>Dark Moon</span>
      </button>
    </header>
  );
}

export default Header