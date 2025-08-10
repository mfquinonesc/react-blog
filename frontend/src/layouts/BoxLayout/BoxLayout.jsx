import './BoxLayout.css';

export default function BoxLayout({ component: Component }) {
    return <section className="box-layout-component">
        <Component></Component>
    </section>
}