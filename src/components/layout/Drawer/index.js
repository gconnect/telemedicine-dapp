
import { Link, useLocation } from 'react-router-dom'
import { AppDrawer } from './Drawer.styles'
import Button from 'react-bootstrap/Button'
import {useState} from "react";
import { PeraWalletConnect } from "@perawallet/connect";

const Drawer = ({ appLinks }) => {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;
  const location = useLocation()

  const peraWallet = new PeraWalletConnect();

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
    <AppDrawer id="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {appLinks.map((link, i) => <li key={i}>
          <Link to={link.link}>{link.title}</Link>
        </li>)}
        {location.pathname === '/app' && <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"   onClick={
          isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick
        }>
          {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
        </Button>}
      </ul>
    </AppDrawer>
  )
}

export default Drawer