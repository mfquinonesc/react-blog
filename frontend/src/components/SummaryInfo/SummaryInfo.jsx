import './SummaryInfo.css';
import { formatDate, formatText } from "../../utilities/utils";
import defaultImage from "../../assets/images/96x96.png";
import { useState, useEffect } from 'react';

export default function SummaryInfo({ title, subtitle, date, text, images: gallery, onClick }) {

    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (gallery?.length > 0) {
            setImages(gallery);
            setIndex(Math.floor(Math.random() * gallery.length));
        }
    }, [gallery]);
  
    return (
        <div className="summary-info-component">
            <figure className="media-left">
                <a className="image is-64x64" onClick={(e) => onClick?.(e)}>
                    <img className="is-rounded" src={images.length > 0 ? images[index] : defaultImage} />
                </a>
            </figure>
            <div>
                {title && <h3>
                    <a className="has-text-primary has-text-weight-semibold" onClick={(e) => onClick?.(e)}>{formatText(title)}</a>
                </h3>}
                {subtitle && <h4 className="has-text-black has-text-weight-semibold">{formatText(subtitle)}</h4>}
                {date && <p className="has-text-text has-text-weight-semibold">{formatDate(date)}</p>}
                {text && <p className="has-text-text has-text-weight-semibold">{formatText(text)}</p>}
            </div>
        </div>)
}