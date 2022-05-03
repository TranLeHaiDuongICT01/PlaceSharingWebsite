import React, { useState } from "react"
import BackDrop from './BackDrop'
import NavLinks from "./NavLinks"
import SideDrawer from "./SideDrawer"
import { Link } from 'react-router-dom'
import Header from "./Header"

import './Navigation.css'
const Nav = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)

    const openDrawer = () => {
        setDrawerIsOpen(true)
    }

    const closeDrawer = () => {
        setDrawerIsOpen(false)
    }
    return (
        <React.Fragment>
            {drawerIsOpen && <BackDrop onClick={closeDrawer} show={drawerIsOpen} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className="drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <Header>
                <button onClick={openDrawer} className="menu-btn">
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="title">
                    <Link to="/">HOME PAGE</Link>
                </h1>
                <nav className="header-nav">
                    <NavLinks />
                </nav>
            </Header>
        </React.Fragment>
    )
}

export default Nav