import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import logo from '../../../assets/img/logo.png'

import {Header, OpenMenu} from './Header.styles'

const AppHeader = ({ appLinks }) => {

  const location = useLocation()
  const navigate = useNavigate()

  const launchApp = () => {
    navigate('/app');
  };

  const openMenu = () => {
    const openMenu = document.getElementById('open-menu')
    const hideMenu = document.getElementById('hide-menu')
    const sidebar = document.getElementById('sidebar')

    openMenu.style.display = 'none'
    hideMenu.style.display = 'block'
    sidebar.style.width = '220px'
  }

  const hideMenu = () => {
    const openMenu = document.getElementById('open-menu')
    const hideMenu = document.getElementById('hide-menu')
    const sidebar = document.getElementById('sidebar')

    openMenu.style.display = 'block'
    hideMenu.style.display = 'none'
    sidebar.style.width = '0'
  }

  return (
    <Header className="app-mx">
      <Link to='/'>
        <img src={logo} alt="app logo"/>
      </Link>
      <ul>
        {/*<HashLink to="#contact">Contact</HashLink>*/}
        {appLinks.map((link, i) => location.pathname !== '/app' && <li key={i}>
          <HashLink smooth to={link.link}>{link.title}</HashLink>
        </li>)}
        {location.pathname !== '/app' && <button onClick={launchApp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Launch App
        </button>}
        {location.pathname === '/app' && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect Wallet
        </button>}
      </ul>
      <OpenMenu id="open-menu" onClick={openMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </OpenMenu>
      <div id="hide-menu" onClick={hideMenu}>
        ✖
      </div>
    </Header>
  )
}

export default AppHeader