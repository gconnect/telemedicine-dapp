
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppDrawer } from './Drawer.styles'
import Button from 'react-bootstrap/Button'
import React, {useState} from "react";
import { HashLink } from 'react-router-hash-link'
import { PeraWalletConnect } from "@perawallet/connect";
import MyAlgoConnect from '@randlabs/myalgo-connect';

const Drawer = ({ appLinks }) => {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;
  const isConnectedToMyAlgoWallet = !!accountAddress
  const location = useLocation()
  const navigate = useNavigate()

  const peraWallet = new PeraWalletConnect();
  const myAlgoWallet = new MyAlgoConnect();

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

  function handleDisconnect() {
    localStorage.clear("address")
    setAccountAddress("");
  }

  const launchApp = () => {
    navigate('/app');
  };

  return (
    <AppDrawer id="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {appLinks.map((link, i) => <li key={i}>
          <HashLink smooth to={link.link}>{link.title}</HashLink>
          {/*<Link to={link.link}>{link.title}</Link>*/}
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
    </AppDrawer>
  )
}

export default Drawer