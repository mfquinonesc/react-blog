const getIsMobile = () => {
    const MAX_WIDTH =  1024; 

    let isMobile = window.innerWidth < MAX_WIDTH;

    window.addEventListener('resize', () => {
       isMobile = window.innerWidth < MAX_WIDTH;       
    });
    
    return isMobile;
}

export { getIsMobile }