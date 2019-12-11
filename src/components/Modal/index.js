import React, { useEffect, useRef, Fragment } from 'react';
import Portal from '../Portal';
import './style.scss';

const Modal = ({ 
    children, 
    isOpen, 
    setIsOpen, 
    mainComponentSelector, 
    modalStyle, 
    arrow 
}) => {
    const wrapperRef = useRef(null);
    const mainStyle = {};
    const style = {...modalStyle};

    const component = document.querySelector(mainComponentSelector);

    const handleOnClickOutside = (event) => {
        if (
            wrapperRef.current && 
            !wrapperRef.current.contains(event.target) && 
            (component || !document.body.contains(document.getElementById('popup')))
        ) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOnClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleOnClickOutside);
        };
    });

    
    if (component) {
        const componentRect = component.getBoundingClientRect()
        style.top = `${componentRect.bottom + (componentRect.height * 2)}px`;
        style.left = `${componentRect.right - (componentRect.width / 2)}px`;
    } else {
        mainStyle.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }

    return (
        <Fragment>
            {isOpen && 
                <Portal>
                    <div id={component ? 'popup' : 'modal'} className="modal" style={mainStyle} >
                        <div className="modal-window" style={style} ref={wrapperRef} >
                            {arrow && <div className="modal-arrow"></div>}
                            <div className="modal-content">
                                {children}
                            </div>
                        </div>
                    </div>
                </Portal>
            }
        </Fragment>
    );
};

export default Modal;