import "./ListView.css";
import { useState, useEffect } from "react";


export default function ListView({ items: list = [], onSelect, onDelete }) {

    const [items, setItems] = useState([]);

    useEffect(() => {      
        setDelete();     
    }, [list]);

    const setDelete = (index = -1) => {
        const arr = list.map((l, ind) => {
            return { ...l, delete: (index == ind) };
        })
        setItems(arr);
    }

    return <ul className="list-view-component">
        {items.map((item, index) => {
            return (
                <li key={index} onMouseEnter={() => setDelete(index)} onMouseLeave={() => setDelete()}>
                    <p>
                        <input type="checkbox" />
                        <a className="has-text-primary" onClick={() => onSelect?.(item)}>{item.label}</a>
                    </p>
                    {item.delete && <a className="icon has-text-primary" onClick={() => onDelete?.(item)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </a>}
                </li>
            )
        })}
    </ul>
    
}