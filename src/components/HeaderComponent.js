import React, {Component} from "react";
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { Link } from "react-router-dom";
import Global from "./Global";

class HeaderComponent extends Component {
    vendorNick = this.props.userNick;
    playerTitle = <h2 className="player-title">{this.vendorNick}</h2>;
    
    state = {
        identity: JSON.parse(localStorage.getItem('identity'))
    }

    url = Global.url;

    logout = () => {
        this.setState({
            identity: null
        });
        localStorage.removeItem('identity');
    }

    render(){
        return (
            <div className="header">
                <div className="logo">
                    <Link to="/">
                    {this.playerTitle}
                    </Link>
                </div>
                <div className="header__search">
                    <input type="text" placeholder="Buscar instrumentales"/>
                    <SearchRoundedIcon className="icon search-icon"/>
                </div>
                <div className="header__right-menu">
                    <div className="header__cart">
                        <ShoppingCartRoundedIcon className="cart-icon"/>
                        <span className="price">
                            0.00<span className="currency">€</span>
                        </span>
                    </div>
                    
                    {this.state.identity
                    ?
                        
                        <div className="user-logged-panel">
                            <div onClick={this.logout} className="user-chip">
                                <img src={this.url + 'get-image-user/'+this.state.identity.image +"?width=40&height=40"} alt="" />
                                <span>{this.state.identity.nick}</span>
                            </div>
                            
                        </div>                 
                    :
                        <button className="btn-login">
                        <Link to={'/'+this.vendorNick+'/login'}>
                        <span className="btn-login-text">Iniciar sesión</span>
                        <span className="btn-login-text-small">Login</span>
                        </Link>
                        </button>
                        
                    }
                    
                    
                    
                </div>
            </div>
            
        );
    }
}

export default HeaderComponent;