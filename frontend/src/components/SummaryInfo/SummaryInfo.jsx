import './SummaryInfo.css';
import { formatDate, toUpperFirst } from "../../utilities/utils";
import defaultImage from "../../assets/images/96x96.png";
import { useState, useEffect } from 'react';

export default function SummaryInfo({ title, date, images:imageUrls, subtitle = undefined, onClick = undefined }) {

    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (imageUrls?.length > 0) {
            setImages(imageUrls);
            setIndex(Math.floor(Math.random() * imageUrls.length));
        }
    }, [imageUrls]);

    const formatText = (text) => {
        return text.split(' ').map(s => { return toUpperFirst(s) }).join(' ');
    }

    return (
        <div className="summary-info-component">
            <figure className="media-left">
                <a className="image is-64x64" onClick={(e) => onClick?.(e)}>
                    <img className="is-rounded" src={images.length > 0 ? images[index] : defaultImage} />
                </a>
            </figure>
            <div>
                <h3>
                    <a className="has-text-primary has-text-weight-semibold" onClick={(e) => onClick?.(e)}>{formatText(title)}</a>
                </h3>
                {subtitle && <h4 className="has-text-black has-text-weight-semibold">{formatText(subtitle)}</h4>}
                <p className="has-text-text has-text-weight-semibold">{formatDate(date)}</p>
            </div>
        </div>)
}