/*global AlgoSigner*/
import React, {useRef, useState} from "react"
import { Modal, Form, Button } from "react-bootstrap"
import  optin  from "../../contract_interactions/optin"
import appCall from "../../contract_interactions/noopCall"

export default function FormModal(props){
  const userAccount = useRef()
  
  const [message, setMessage] = useState("")
  const [walletAddress, setWalletAddrss] = useState("")
  const getAddress = localStorage.getItem("address")
  console.log(getAddress)

 const  handleMessageChange =(e) => {
    setMessage(e.target.value);
    console.log(e.target.value)
 }

 const handleWalletAddressChange =(e) => {
  setWalletAddrss(e.target.value);
  console.log(e.target.value)
}

  const handleTransfer = async () => {
  //  const appOptin = await optin(getAddress)
  //    console.log(appOptin)

   const callApp = await appCall(getAddress, walletAddress)
   props.onHide()
   console.log(callApp)
  }

  return (
    <>
    <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>General Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="message"
                autoFocus
                onChange={handleMessageChange}
                value={message}
                maxLength= {50}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Recipient Wallet Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Receipient Address"
                autoFocus
                onChange={handleWalletAddressChange}
                value = {walletAddress}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTransfer}>
            Book Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}