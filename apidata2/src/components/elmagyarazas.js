import React, { useState, useEffect } from 'react';

const MyComponent = () => {
    const [position, setPosition] = useState({
        x: window.innerWidth / 2 - 150,
        y: window.innerHeight / 2 - 150
    });

    // Optional: If you want to update the position when the window is resized
    useEffect(() => {
        const handleResize = () => {
            setPosition({
                x: window.innerWidth / 2 - 150,
                y: window.innerHeight / 2 - 150
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ position: 'absolute', left: position.x, top: position.y }}>
            {/* Your content here */}
        </div>
    );
};

export default MyComponent;

//1. Initialization of state

const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 150,
    y: window.innerHeight / 2 - 150
});

/*
This initializes the position state with the x and y coordinates calculated based on the center of the window 
minus an offset of 150 pixels. 
The offset is presumably to center an element of a specific width and height (300px) on the screen.
*/
//2. handling window resize 
useEffect(() => {
    const handleResize = () => {
        setPosition({
            x: window.innerWidth / 2 - 150,
            y: window.innerHeight / 2 - 150
        });
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);
/*
This useEffect hook adds an event listener to update the position when the window is resized. 
This ensures the element remains centered even when the window size changes.
*/
//3. Styling the element 

/*
return (
    <div style={{ position: 'absolute', left: position.x, top: position.y }}>
         Your content here 
        </div>
    );
    
The element is positioned absolutely on the page using the left and top properties set to the x and y coordinates from the state.

This setup ensures that your component will be initially centered and will remain centered if the window is resized.
*/