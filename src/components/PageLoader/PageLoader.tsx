import React from 'react';
import './styles.css'
export const PageLoader = () => {
    return (
        <div>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default PageLoader;