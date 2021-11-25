import React, {Component} from "react";

class PeliculasComponent extends Component {
    peliculas = ['La red', 'Harry Potter']

    render(){
        

        return (

                <div>
                    <h2>Peliculas</h2>

                    <ul>
                        {
                            this.peliculas.map((pelicula, i) => {
                                return (
                                    <li key={i}>
                                        {pelicula}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                


            
        );
    }
}

export default PeliculasComponent;