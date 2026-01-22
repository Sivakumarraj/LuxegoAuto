import React from 'react';

const StyledJsxWrapper = ({ children, ...props }) => {
    // Create a clean props object without jsx and global
    const cleanProps = { ...props };
    delete cleanProps.jsx;
    delete cleanProps.global;
    
    return (
        <style {...cleanProps} jsx="true" global="true">
            {children}
        </style>
    );
};

export default StyledJsxWrapper;