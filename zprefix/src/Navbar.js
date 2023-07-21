import React, {useState} from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './Navbar.css'


export default function Navbar() {
const [click, setClick] = useState(false);

const handleClick = () => setClick(!click);

    return (
      <nav className='nav'>
        <Link to='/Fruitpage' className='site-title'>
          All about fruit
        </Link>
        <ul>
          <CustomLink to="/pricing">How much this fruit cost?</CustomLink>
          <CustomLink to="/Information">Talk to me about Fruit</CustomLink>
          <CustomLink to="/New">Take me home im scared</CustomLink>
        </ul>
      </nav>

      // <>
      // <nav className="Navbar">
      //   <div className='Navbar-container'>
      //   </div>
      //   <ul className={click ? 'nav-menu active' : 'nav-menu'}>
      //     <li className='nav-item'>
      //       <Link to = '/Fruitpage' className='nav-links'>
      //         FruitPage
      //       </Link>
      //     </li>
      //   </ul>
      // </nav>
      // </>
    )
    }

    function CustomLink({ to, children, ...props}) {
      const resolvedPath = useResolvedPath(to)
      const isActive = useMatch({ path: resolvedPath.pathname, end: true})

      return (
        <li className={isActive ? 'active' : ""}>
          <Link to={to} {...props}>
            {children}
          </Link>
        </li>

      )
    }


  