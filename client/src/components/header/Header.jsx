import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (

        <div style={{background:'linear-gradient(to right, #373b44, #4286f4)', borderBottom:'1px solid aqua'}}>
            <h2><Link to = "/" style={{color:'white', fontSize:'18px', fontFamily:'Righteous'}}>NoteRail</Link></h2>
          </div>
        
    )
}

export default Header
