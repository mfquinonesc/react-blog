import "./Notification.css";
import { useState, useEffect, useRef } from "react";


export default function Notification({ message, visible = false, color = true, time = 4000, onClick }) {

  const [active, setActive] = useState(false);
  const boxRef = useRef(null);
  
  useEffect(() => {
    if (visible) {
      setActive(true);
      setTimeout(() => setActive(false), time);
    }

    const handleClose = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setActive(false);      
      }
    }

    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };

  }, []);
 
  return (
    <div ref={boxRef} className={`notification-component ${color ? 'has-background-primary' : 'has-background-white'} ${active ? 'active' : ''}`}>
      <a className={`${color ? 'has-text-white' : 'has-text-primary'} has-text-weight-semibold`} onClick={() => onClick?.(message)}>
        <span className="mr-3"><i class="fa-solid fa-bell"></i></span>
        {message}
      </a>
    </div>
  );
}
