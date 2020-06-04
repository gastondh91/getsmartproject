import React from 'react'
import { useDispatch } from 'react-redux'
import Nav from 'react-bootstrap/Nav'
import { setBusqueda } from '../../redux/action-creators/action-creator'
/* eslint-disable no-unused-vars */
import style from './NavbarUserStyles.css'

const tabs = ['Catálogo', 'iPhone', 'Samsung', 'Motorola', 'Xiaomi', 'Huawei', 'LG']


const NavbarContainer = ({ history }) => {

  const dispatch = useDispatch()

  return (

    <div className="navbar-user">
      <Nav
        onSelect={(selectedKey) => {

          let searchCriteria = selectedKey

          if (selectedKey === 'Catálogo') searchCriteria = ''
          dispatch(setBusqueda(searchCriteria))
          history.push('/productos')

        }}
        justify
      >
        {tabs.map((tab, index) => (
          <Nav.Item key={index}>
            <Nav.Link eventKey={tab}>
              {tab}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  )

}

export default NavbarContainer
