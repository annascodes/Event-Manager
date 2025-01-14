import React, { useEffect, useState } from 'react'

const Test = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPause, setIsPause] = useState(false);
    [...Array(50)].map((_, i) => {
        console.log(`${i} % 13: `, i % 13)
    })

    // Function to handle forward navigation
    const goForward = () => {
        setCurrentIndex((prevIndex) => {
            console.log('prevIndex: ', prevIndex)
            console.log('result: ', (prevIndex + 1) % images.length)
            return (prevIndex + 1) % images.length
        });
    };

    // Function to handle backward navigation
    const goBackward = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Auto-play functionality using useEffect
    useEffect(() => {
        if (isPause) {
            const interval = setInterval(() => {
                goForward(); // Automatically go forward every second
            }, 1000);

            // Cleanup interval on component unmount
            return () => clearInterval(interval);
        }
    }, [images.length]); // Dependency ensures the effect runs if the array changes

    console.log(currentIndex)
    return (
        <div>
            <div>
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    style={{ width: '300px', height: '200px' }}
                />
            </div>
            <button className='btn btn-xs btn-outline rounded-lg' onClick={goBackward}>Backward</button>
            <br />
            <button className='btn btn-xs btn-outline rounded-lg' onClick={goForward}>Forward</button>
            <button className='btn btn-xs btn-outline rounded-lg' onClick={() => setIsPause(isPause ? false : true)}>{isPause ? 'play' : 'pause'} </button>

        </div>
    )
}

export default Test

// ------------------ 

