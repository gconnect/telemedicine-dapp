import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import logo from '../../../assets/img/logo.png'
import Button from 'react-bootstrap/Button';

import { PeraWalletConnect } from "@perawallet/connect";
import { Header, OpenMenu } from './Header.styles'
// Create the PeraWalletConnect instance outside of the component
const peraWallet = new PeraWalletConnect();

const AppHeader = ({ appLinks }) => {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

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

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

      if (accounts.length) {
        setAccountAddress(accounts[0]);
      }
    });
  }, []);
  
  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
      })
      .reject((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
    }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();

    setAccountAddress(null);
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
        {location.pathname !== '/app' && <Button onClick={launchApp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Launch App
        </Button>}
        {/*{location.pathname === '/app' && <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"   onClick={*/}
        {/*isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick*/}
        {/*}>*/}
        {/*{isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}*/}
        {/*</Button>}*/}
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