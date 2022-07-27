import { Modal, Form, Button } from "react-bootstrap"

export default function FormModal(props){

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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Recipient Wallet Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Receipient Address"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onHide}>
            Book Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}