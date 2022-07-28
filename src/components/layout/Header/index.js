/*global AlgoSigner*/

import React, {useEffect, useState, useRef} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { PeraWalletConnect } from "@perawallet/connect";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import logo from '../../../assets/img/logo.png'
import Button from 'react-bootstrap/Button';
import { Header, OpenMenu } from './Header.styles'
// Create the PeraWalletConnect instance outside of the component
const peraWallet = new PeraWalletConnect();
const myAlgoWallet = new MyAlgoConnect();

const AppHeader = ({ appLinks }) => {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;
  const isConnectedToMyAlgoWallet = !!accountAddress
  const userAccount = useRef()


  // Connect with AlgoSigner
  const connectWithAlgoSigner = async () =>{
    let resp = await AlgoSigner.connect()
        console.log(resp)
        getUserAccount()
  }
  const getUserAccount = async () =>{
    userAccount.current =  await AlgoSigner.accounts({
         ledger: 'TestNet'
       })
       setAccountAddress(userAccount.current[0]['address'].substring(0,14) + "...")
    // console.log(userAccount.current[0]['address'])
    console.log(userAccount.current)
    localStorage.setItem("address", userAccount.current[0]['address'])


 }

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

  // My Algowallet connect integration
/*Warning: Browser will block pop-up if user doesn't trigger myAlgoWallet.connect() with a button interation */
  const connectToMyAlgo = async() => {
    try {
      const accounts = await myAlgoWallet.connect();
      const addresses = accounts.map(account => account.address);
      console.log(addresses)
      setAccountAddress(addresses[0])
      localStorage.setItem("address", addresses[0])
      
    } catch (err) {
      console.error(err);
    }
  }

//Perawallet connect integration
  useEffect(() => {
    const value = localStorage.getItem("address")
    if(value){
      setAccountAddress(value)
    }
    // Reconnect to the session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
      if (accounts.length) {
        setAccountAddress(accounts[0]);
        localStorage.setItem("address", accounts[0])
      }
    });
  }, [isConnectedToMyAlgoWallet, accountAddress]);
  
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

  function handleDisconnect() {
    localStorage.clear("address")
    setAccountAddress("");
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
        {location.pathname !== '/app' && <Button onClick={launchApp}>
          Launch App
        </Button>}
        {location.pathname === '/app' && <Button  onClick={
        // isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick
          isConnectedToMyAlgoWallet ? handleDisconnect : connectToMyAlgo
        }>
        {isConnectedToMyAlgoWallet ? "Disconnect" : "Connect to MyAlgo Wallet"}
        {/* {isConnectedToMyAlgoWallet ? `${accountAddress.substring(0,10)}...` : "Connect Wallet"} */}
        </Button>}
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