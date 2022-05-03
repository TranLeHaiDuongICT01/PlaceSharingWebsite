import React from "react"
import ReactDOM from "react-dom"
import BackDrop from "../Pages/Navigation/BackDrop"
import { CSSTransition } from "react-transition-group"
import './Component.css'

const ModalOverlay = props => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    )
    return content
}
const Modal = (props) => {
    return <React.Fragment>
        <CSSTransition in={props.show}
            mountOnEnter
            unmountOnExit
            timeout={200}
            classNames="modal" >
            <ModalOverlay {...props} />
        </CSSTransition>
    </React.Fragment>
}

export default Modal