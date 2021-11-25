import React from "react";


function ErrorComponent() {

    
    return (
        
        <React.Fragment>

            <main className="App-content">
                <div className="error error-404">
                    <img src="https://miro.medium.com/max/1838/1*zE2qnVTJehut7B8P2aMn3A.gif" alt="" />
                    <h1 className="error-title">Pagina no encontrada</h1>
                    <p>La página a la que intentas acceder no existe en la web</p>
                </div>
            </main>

        
        </React.Fragment>
        
    );
    
}

export default ErrorComponent;