import { useState, useEffect } from "react";
import "./Slider.css";

export default function Slider({ images }){

    const [currentIndex, setCurrentIndex] = useState(0);

    const id = `id-track-${Math.random().toString().replaceAll('.','-')}`;    
    const [trackId, setTrackId] = useState(id);   
   
    const update = (direction = null) => {

        let index = currentIndex;

        if(direction == 'next'){
            index = (currentIndex + 1) % images.length;
        }

        if(direction == 'prev'){
            index = (currentIndex - 1 + images.length) % images.length; 
        }

        const track = document.getElementById(trackId);
        const figures = track.getElementsByTagName('figure');
        const slideWidth = figures[0].getBoundingClientRect().width;
        
        track.style.transform = `translateX(-${index * slideWidth}px)`;

        setCurrentIndex(index);
    }

    const clickHandler = (direction)=>{      
        update(direction);        
    }      
   
    window.addEventListener('resize', update);

    return(
        <div className="slider-component"> 
            <div id={trackId}>                
                {
                    images.map((img, index) => {
                        return <figure key={index} className="image is-16by6" >
                                <img  src={ img } />
                            </figure>
                    })
                }                             
            </div>
            <button type="button" onClick={()=>clickHandler('prev')} style={{display:`${(currentIndex == 0)?'none':''}`}}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>            
            <button type="button" onClick={()=>clickHandler('next')} style={{display:`${(currentIndex == images.length-1)?'none':''}`}}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>   
        </div>  
    );
}