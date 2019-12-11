import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
    const element = document.createElement('div');

    useEffect(() => {
        document.body.append(element);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
            document.body.removeChild(element);
        }
    }, [element]);
    return createPortal(children, element);
};

export default Portal;