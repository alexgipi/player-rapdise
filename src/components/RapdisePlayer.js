import React, { useRef, useState } from "react";
import axios from "axios";

import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import AlbumIcon from '@material-ui/icons/Album';

import { Navigate, useParams } from "react-router";
import HeaderComponent from "./HeaderComponent";
import PlayerComponent from "./BottomBarPlayer";

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

import { useEffect } from 'react';

import Global from "./Global";
import BottomBarPlayer from "./BottomBarPlayer";
import SelectedBeat from "./SelectedBeat";


function RapdisePlayer(props) {
    const bottomBarPlayerRef = useRef()

    const url = Global.url;
    const [user, setUser] = useState({});

    const [isPlaying, setIsPlaying] = useState(false);
    const [beats, setBeats] = useState({});
    const [status, setStatus] = useState(null);

    const [currentBeatIndex, setCurrentBeatIndex] = useState(0)
    const [nextBeatIndex, setNextBeatIndex] = useState(currentBeatIndex + 1)

    const [selectedBeat, setSelectedBeat] = useState({});

    const [loading, setLoading] = useState(false);

    // const [identity, setIdentity] = useState(JSON.parse(localStorage.getItem('identity')));

    const { userNick } = useParams();
    

    useEffect(() => {

        console.log(userNick)
        getUserByNick(userNick);
    }, []);


    const getUserByNick = (nick) => {
        axios.get(`${url}user/${nick}`).then(res => {
            console.log(res.data)
            if(res.data.user){
                let user = res.data.user;
                console.log(user)
                setUser(user);
                

                getBeatsUser(user._id, 'Todo', false, 'mas-reciente', false, 40, 1)
            } else {
                // NO EXISTE
                setStatus('error')
                
            }
        })
    }

    const getBeatsUser = (idUsuario, estilo, descargable, orden, inDrafts, limit,pagina) => {
        setLoading(true);
        axios.get(`${url}beats-filtro-estilos-paginado-usuario/${idUsuario}/${estilo}/${descargable}/${orden}/${inDrafts}/${limit}/${pagina}`)
        .then(res => {
            console.log(res.data.beats);
            if(res.data.beats){
                setBeats(res.data.beats)
                setStatus('success');
                setLoading(false);

                setSelectedBeat(res.data.beats[0]);
            }
        })
	}

    const selectBeat = (beat, i) => {
        setSelectedBeat(beat);
        setCurrentBeatIndex(i);
        setNextBeatIndex(i+1);

        bottomBarPlayerRef.current.playFromOutside();

    }

    useEffect(() => {
        setNextBeatIndex(()=>{
            if(currentBeatIndex + 1 > beats.length - 1){
                return 0;
            } else {
                return currentBeatIndex +1;
            }
        })
    }, [currentBeatIndex])
    
    if(status === 'error'){
        return <Navigate to={'/'} />
    }

    

    return (
        <React.Fragment>

            <main className="App-content">

                <SelectedBeat selectedBeat={selectedBeat}/>

                <div className="playlist">
                    <div className="playlist__header">

                    </div>

                    {status === 'success' &&
                        <ul className="playlist__items">
                            {beats.map((beat, i) => {
                                return (
                                    <li onClick={()=>{selectBeat(beat, i)}} key={beat._id} className="item">
                                        <div className="gridcell gridcell--cover">
                                        {selectedBeat._id === beat._id
                                            ? 
                                            <div className={`playing-state ${isPlaying || selectedBeat._id === beat._id ? 'playing' : ''}`}>
                                                {!isPlaying && <PlayCircleFilledIcon className="icon play"/>}
                                                {isPlaying && <PauseCircleFilledIcon className="icon pause"/>}
                                            </div>                                            
                                            :
                                            <div className="playing-state">
                                                <PlayCircleFilledIcon className="icon play"/>
                                            </div>
                                        }
    
                                            
                                            

                                            <div className="gridcell-content">
                                                {beat.image
                                                ? <img src={url + 'get-imagen-beat/' + beat.image + '?width=50&height=50'} alt="" />
                                                : <AlbumIcon className="icon album-icon"/>
                                                }
                                            </div>
                                            
                                        </div>

                                        <div className="gridcell gridcell--title">
                                        
                                                {beat.name}
                                        
                                            
                                        </div>

                                        <div className="gridcell gridcell--duration">
                                            <div className="gridcell-content">
                                                {beat.duration && beat.duration !== "null" && beat.duration !== '' && beat.duration !== '0NaN:0NaN' && beat.duration !== 'Infinity:0NaN'
                                                    ? beat.duration
                                                    : '0:00'
                                                }
                                            </div>                                        
                                        </div>

                                        <div className="gridcell gridcell--bpm">
                                            <div className="gridcell-content">
                                                {beat.bpm && beat.bpm !== 'null' ? beat.bpm : 0} BPM
                                                
                                            </div>
                                        </div>

                                        <div className="gridcell gridcell--tags">

                                                <span className="tag">#{beat.style[0]}</span>

                                                {beat.tags.map((tag, i) => {
                                                    return (
                                                        <span key={'tag'+i} className="tag">{tag}</span>
                                                    )
                                                })}
                                            
                                        </div>

                                        <div className="gridcell gridcell--actions">
                                            <div className="gridcell-content">
                                                <span className="price">
                                                    19.99<span className="currency">€</span>
                                                </span>
                                                <button className="btn add-cart">
                                                    <ShoppingCartRoundedIcon className="icon"/>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    }

                    {loading &&
                        <ul className="playlist__items skeleton">
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((beat, i) => {
                                return (
                                    <li key={i} className="item">
                                        <div className="gridcell gridcell--cover skeleton-box">
                                            <div className="gridcell-content">
                                            <AlbumIcon className="icon album-icon"/>
                                            </div>
                                        </div>

                                        <div className="gridcell gridcell--title">
                                            <div className="gridcell-content skeleton-box">
                                            Bombap, Trap, Lofi, TypeBeat
                                            </div>
                                        </div>

                                        <div className="gridcell gridcell--duration">
                                            <div className="gridcell-content skeleton-box">
                                                00:00                                        
                                            </div>
                                        </div>

                                        <div className="gridcell gridcell--bpm">
                                            <div className="gridcell-content skeleton-box">
                                                0
                                            </div>
                                        </div>

                                        <div className="gridcell gridcell--tags">
                                            <div className="gridcell-content">
                                                <span className="tag skeleton-box">#hip hop</span>
                                                <span className="tag skeleton-box">#Boom Bap</span>
                                                <span className="tag skeleton-box">#Trap</span>
                                            </div>
                                        </div>

                                        <div className="gridcell gridcell--actions">
                                            <div className="gridcell-content">
                                                <span className="price">
                                                    19.99<span className="currency">€</span>
                                                </span>
                                                <button className="btn add-cart">
                                                    <ShoppingCartRoundedIcon className="icon"/>
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    }
                    
                </div>
            </main>
            
            
            <BottomBarPlayer ref={bottomBarPlayerRef} currentBeatIndex={currentBeatIndex} setCurrentBeatIndex={setCurrentBeatIndex} setSelectedBeat={setSelectedBeat} beats={beats} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>  
            
                 
            
        </React.Fragment>
    );
    
}

export default RapdisePlayer;