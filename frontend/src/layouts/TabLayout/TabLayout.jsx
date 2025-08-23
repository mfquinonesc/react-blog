import './TabLayout.css';

export default function TabLayout({ component: Component, active = false }) {
    return <>
        {active && <section className="tab-layout-component">
            <Component></Component>
        </section>}
    </>
}