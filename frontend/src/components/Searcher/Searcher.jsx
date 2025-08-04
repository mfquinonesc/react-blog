export default function Searcher({ onChange, onClose }) {
    return <>
        <div className="field has-addons">
            <p className="control  is-expanded has-icons-left is-small">
                <input className="input is-small is-primary" type="text" placeholder="Search" onChange={(e) => onChange?.(e.target.value)} />
                <span className="icon is-small is-left has-text-primary">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
            </p>
            <p className="control is-small">
                <a className="button is-small is-primary" onClick={() => onClose?.(true)}>
                    <span className="icon has-text-white">
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </a>
            </p>
        </div>
    </>
} 