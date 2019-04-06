import React from 'react';
import MediaQuery from 'react-responsive';

class UnAuthPage extends React.Component{
    render() {
        return(
            <div>
                <MediaQuery minDeviceWidth={1176}>
                    <div className="Unauthorised">
                        <h1>Вы не авторизованы!</h1>
                        <h2>Пожалуйста, войдите в систему</h2>
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={829} maxDeviceWidth={1175}>
                    <div className="Unauthorised">
                        <h2>Вы не авторизованы!</h2>
                        <h4>Пожалуйста, войдите в систему</h4>
                    </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={828}>
                    <div className="Unauthorised">
                        <h4>Вы не авторизованы!</h4>
                        <h4>Пожалуйста, войдите в систему</h4>
                    </div>
                </MediaQuery>
            </div>
        )
    }
}

export default UnAuthPage;