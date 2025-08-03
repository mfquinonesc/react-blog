export default function useIconColor(defaultColor, backgroundColor, fillColor) {

    let background = backgroundColor ? backgroundColor : 'transparent';
    let fill = fillColor ? fillColor : '#FFF';

    if (defaultColor) {
        const rootStyles = window.getComputedStyle(document.documentElement);
        const color = rootStyles.getPropertyValue("--blog-color-primary").trim();       
        fill = color;
        background = 'transparent';
    }

    return { background, fill };
}