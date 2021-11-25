import React from "react";
import Global from "./Global";

import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import AlbumIcon from '@material-ui/icons/Album';

const SelectedBeat = ({selectedBeat}) => {
    const url = Global.url;

    return (
        <li className="selected-item">
            <div className="selected-item__cover">
                {selectedBeat.image
                    ? <img src={url + 'get-imagen-beat/' + selectedBeat.image + '?width=160&height=160'} alt="" />
                    : <AlbumIcon className="icon album-icon"/>
                }
            </div>
            <div className="selected-item__details">
                <h2 className="selected-item__title">{selectedBeat.name}</h2>
                <div className="selected-item__tags">
                    <span className="tag">#{selectedBeat.style && selectedBeat.style[0]}</span>

                    {selectedBeat.tags && 
                        selectedBeat.tags.map((tag, i) => {
                            return (
                                <span key={'tag'+i} className="tag">{tag}</span>
                            )
                        })
                    }
                </div>
                <div className="selected-item__actions">
                    <button className="btn add-to-cart-btn">
                        <ShoppingCartRoundedIcon className="icon"/> <span className="text">Añadir al carrito</span>
                    </button>
                </div>
            </div>
            
        </li>
    )
}

export default SelectedBeat