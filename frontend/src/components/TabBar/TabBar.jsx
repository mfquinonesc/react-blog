import { useState, useEffect } from "react";
import { TabItems } from "../../hooks/useTabItems";
import { formatText } from "../../utilities/utils";
import "./TabBar.css";

export default function Tab({ labels = [], onSelect }) {

    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        setTabs(new TabItems(labels).toArray());
    }, []);

    const select = (tab) => {
        const tabItems = new TabItems(labels).select(tab.label).toArray();      
        setTabs(tabItems);
        onSelect?.(tabItems);
    }

    return <>
        <ul className="tab-bar-component">
            {
                tabs.map((t, ind) => {                  
                    return <li key={ind} className={t.active ? 'is-active' : ''} onClick={() => select?.(t)}>
                        <a>{formatText(t.label)}</a>
                    </li>
                })
            }
        </ul>
    </>
}