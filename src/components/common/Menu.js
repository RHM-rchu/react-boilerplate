import React, { Component } from 'react'
import { Nav, NavItem, Glyphicon } from "react-bootstrap"
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap"

/**
 *
 * Menu compenent
 *
 */
export default class Menu extends Component {

  render() {
    return (
      <Nav bsStyle="pills">
        <IndexLinkContainer to="/">
          <NavItem>
          Home <Glyphicon glyph="home"/>
          </NavItem>
        </IndexLinkContainer>
        <LinkContainer to="/clinic-edit">
          <NavItem>
          Add Clinic <Glyphicon glyph="plus-sign"/>
          </NavItem>
        </LinkContainer>
      </Nav>
    )
  }

}

