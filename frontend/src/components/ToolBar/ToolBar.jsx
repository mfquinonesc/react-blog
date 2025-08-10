import './ToolBar.css';
import { useState } from 'react';

export default function ToolBar({ position = {}, onUpdate = undefined, onDelete = undefined }) {

    const [isActive, setIsActive] = useState(false);

    return (
        <ul className='tool-bar-component' style={{ ...position }}>
            {isActive && <li>
                <a className="icon has-text-primary" onClick={(e) => onUpdate?.(e)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </a>
            </li>}
            {isActive && <li>
                <a className="icon has-text-primary" onClick={(e) => onDelete?.(e)}>
                    <i className="fa-solid fa-trash-can"></i>
                </a>
            </li>}
            <li>
                <a className="icon has-text-primary" onClick={() => setIsActive(!isActive)}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </a>
            </li>
        </ul>
    );
}