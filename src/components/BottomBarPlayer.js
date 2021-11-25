import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';

import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import { Slider } from "@material-ui/core";

import AlbumIcon from '@material-ui/icons/Album';
import Global from "./Global";


function BottomBarPlayer(props, ref) {
    const url = Global.url;

    const audioEl = useRef(null);

    // const [isPlaying, setIsPlaying] = useState(false);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const [shuffleActive, setShuffleActive] = useState(false);
    const [repeatActive, setRepeatActive] = useState(false);
    

    const audioPlayer = useRef(); 
    
    const [sliderValue, setSliderValue] = useState(0);

    const [sliderVolValue, setSliderVolValue] = useState(1);
    

    const currentBeat = props.beats[props.currentBeatIndex];

    useImperativeHandle(ref, () => ({
        playFromOutside() {
            setTimeout(()=>{
                audioEl.current.play();
            }, 100)
        }
      }), [])

    useEffect(()=>{
        if(currentBeat){

            audioEl.current.onloadedmetadata = () =>{
                const seconds = Math.floor(audioEl.current.duration);
                setDuration(seconds)
            }

            audioEl.current.onplaying = () =>{
           
                props.setIsPlaying(true);
            }

            audioEl.current.onpause = () =>{
                props.setIsPlaying(false);

            }

            audioEl.current.onended = () =>{
                if(!repeatActive){
                    next();
                } else {
                    
                    audioEl.current.play();
                    
                }
                
            }

            audioEl.current.ontimeupdate = () =>{
                setCurrentTime(audioEl.current.currentTime)                
                setSliderValue(audioEl.current.currentTime);         
                
            }

            
        }

        
           

    });

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${returnedMinutes}:${returnedSeconds}`
    }
    
    const SkipSong = (forwards = true) => {
        if(forwards){
            props.setCurrentBeatIndex(()=>{
                let temp = props.currentBeatIndex;
                temp++;

                if(temp > props.beats.length - 1) {
                    temp = 0;
                }

                props.setSelectedBeat(props.beats[temp])
                return temp;
            })
        }else {
            props.setCurrentBeatIndex(()=>{
                let temp = props.currentBeatIndex;
                temp--;

                if(temp < 0) {
                    temp = props.beats.length -1;
                }
                props.setSelectedBeat(props.beats[temp])
                return temp;
            })

            
        }

        setTimeout(()=>{
            audioEl.current.play();
        }, 100)
    }

    const handleChange = (event, newValue) => {
        audioEl.current.pause();
        setSliderValue(newValue);
        setCurrentTime(newValue)
        audioEl.current.currentTime = newValue;
        
    };

    const handleChangeCommitted = (event, newValue) => {
        audioEl.current.play();        
    };

    const handleChangeVolume = (event, newValue) => {
        console.log({newValue})
        setSliderVolValue(newValue);
        audioEl.current.volume = newValue;
    };
    

    const prev = () => {
        SkipSong(false);
        
    }

    const togglePlay = () =>{
        if(audioEl.current.paused && !props.isPlaying) {
            audioEl.current.play();
        } else if (!audioEl.current.paused && props.isPlaying) {
            audioEl.current.pause();
        }
    }


    const next = () => {
        SkipSong();
        
    }

    const comprar = () => {
        alert("comprar")
    }

    const toggleShuffle = () => {
        setShuffleActive(!shuffleActive)
    }

    const toggleRepeat = () => {
        setRepeatActive(!repeatActive)
    }

    
    return (
        
        <div className="player">
            <div className="player__info">
                <div className="cover">
                    {currentBeat && currentBeat.image
                        ? <img src={url + 'get-imagen-beat/' + currentBeat.image + '?width=50&height=50'} alt="" />
                        : <AlbumIcon className="icon album-icon"/>
                    }
                </div>
                <div className="details">
                    {currentBeat
                        ? <h3 className="title">{currentBeat.name}</h3>
                        : <h3 className="title">Cargando...</h3>
                    }

                    <span className="autor">
                        {currentBeat && currentBeat.user &&
                            currentBeat.user.nick
                        }
                    </span>
                </div>
            </div>
            
            {currentBeat &&
                <audio preload="true" src={url + '/get-audio-beat/' + currentBeat.file} ref={audioEl} controls></audio>
            }
            
            
            

            <div className="player__controls">
                <ShuffleIcon onClick={toggleShuffle} className={`icon shuffle-icon ${shuffleActive ? 'active' : ''}`}/>
                <SkipPreviousIcon onClick={prev} className="icon prev-icon"/>
                
                {!props.isPlaying
                    ?   <PlayArrowIcon onClick={togglePlay} className="icon play-icon"/>
                    :   <PauseIcon onClick={togglePlay} className="icon pause-icon"/>
                }
                    
                <SkipNextIcon onClick={next} className="icon next-icon"/>

                <RepeatIcon onClick={toggleRepeat} className={`icon repeat-icon ${repeatActive ? 'active' : ''}`}/>

                <div className="player-times">
                    <span className="player-times__current">{calculateTime(currentTime)}</span>
                    <span className="player-times__sep">
                        /
                    </span>
                    <span className="player-times__duration">
                        {(duration && !isNaN(duration)) && calculateTime(duration)}
                    </span>
                </div>
                <Slider aria-label="Current time" step={0.01} value={sliderValue} onChange={handleChange} onChangeCommitted={handleChangeCommitted} min={0} max={duration}/>
                
                
            </div>
            
            <div className="volume-control">
                    {sliderVolValue === 0 ? <VolumeMuteIcon className="icon vol-mute"/>
                        : sliderVolValue > 0 && sliderVolValue <= 0.5 ? <VolumeDownIcon className="icon vol-down"/>
                        : <VolumeUpIcon className="icon vol-up"/>
                    }
                    
                    <Slider aria-label="Volume" step={0.05} value={sliderVolValue} min={0} max={1} onChange={handleChangeVolume} />
            </div>

            <div className="player__actions">
                <button className="btn">
                    <ShoppingCartIcon onClick={comprar} className="icon"/> <span className="text">Comprar</span>
                </button>
            </div>
        </div>            
    );
}



export default forwardRef(BottomBarPlayer);