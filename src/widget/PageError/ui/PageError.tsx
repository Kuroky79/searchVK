import React from 'react';
import './style.css'
const PageError: React.FC = () => {

    const reloadPage = () => {
        location.reload();
    };

    return (
        <div className={'PageError'}>
            <p>{'Произошла непридвиденная ошибка!'}</p>
            <button onClick={reloadPage}>{'Обновить страницу'}</button>
        </div>
    );
};

export default PageError;