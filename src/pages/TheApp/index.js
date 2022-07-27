import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Animated } from 'react-animated-css'
import { Button, Container } from 'react-bootstrap'
import TransactionHistoryTable from './TransactionHistoryTable'
import FormModal from './FormModal'

const TheApp = () => {
  let location = useLocation()
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => {setShowModal(false)}

  useEffect(() => {
    if (window.innerWidth <= 767) {
      const openMenu = document.getElementById('open-menu')
      const hideMenu = document.getElementById('hide-menu')
      const sidebar = document.getElementById('sidebar')

      openMenu.style.display = 'block'
      hideMenu.style.display = 'none'
      sidebar.style.width = '0'
    }
  }, [location])

  return (
    <Container>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div className="min-height">

        <div>
          <Button onClick={() => setShowModal(true)}>
            Consult Doctor
          </Button>
          {showModal ? <FormModal show={showModal} onHide= {() => handleClose()} /> : null }        
        </div>
        <TransactionHistoryTable/>
      </div>
    </Animated>
    </Container>
  )
}

export default TheApp