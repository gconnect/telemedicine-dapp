/*global AlgoSigner*/
import React, {useRef, useState, useEffect} from "react"
import { Modal, Form, Button, Alert } from "react-bootstrap"
import appCall from "../../contract_interactions/noopCall"
import { StyleSheet, css } from 'aphrodite'
import { DOCTOR, PHARMACIST, INSURER } from "../../constants"

export default function FormModal(props){
  
  const [message, setMessage] = useState("")
  const [walletAddress, setWalletAddrss] = useState(DOCTOR)
  const [errorMessage, setErrorMessage] = useState("")
  const [amount, setAmount] = useState(0)

  const accountAddress = localStorage.getItem("address")
  console.log(accountAddress)

  const addressList = [
    {name: "Doctor", value: DOCTOR },
    {name: "Pharmacist", value: PHARMACIST},
    {name: "Insurer", value: INSURER},
  ]

const styles = StyleSheet.create({
  error: {
    color: 'red'
  },
  select: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px'
  }

})
  
 const  handleMessageChange =(e) => {
    setMessage(e.target.value);
    console.log(e.target.value)
 }

 const handleWalletAddressChange =(e) => {
  setWalletAddrss(e.target.value);
  console.log(e.target.value)
}

const handleAmountChange = e =>{
  setAmount(e.target.value)
  console.log(amount)
}

  const handleTransfer = async () => {
    if(message === "") {
      setErrorMessage("Fields cannot be empty")
      return
    }
    if(walletAddress === ""){
      setErrorMessage("Fields cannot be empty")
    }
 
      if(accountAddress === INSURER){
          await appCall(accountAddress, walletAddress, message, amount)
      }else{
          await appCall(accountAddress, walletAddress, message, 0)
      }
      props.onHide()
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
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                  onChange={handleMessageChange}
                  value={message}
                  required
                />
            </Form.Group>
            <Form.Label>Select Receipient Address</Form.Label>
            <select className={css(styles.select)} name="addresses" id="addresses" onChange={handleWalletAddressChange} value={walletAddress}>
            {addressList.map((item) => <option value={item.value}>{item.name}</option>)}
            </select>
            { accountAddress === INSURER ? <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="amount"
                autoFocus
                onChange={handleAmountChange}
                value = {amount}
                required
              />
            </Form.Group> : null}       
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleTransfer}>
            {props.buttonText}
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}