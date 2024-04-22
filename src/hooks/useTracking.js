import { useEffect, useRef } from 'react';

function useTracking(page) {
    const enterTime = useRef(Date.now());

    useEffect(() => {
        // Function to handle page clicks
        const handlePageClick = () => {
            fetch('http://localhost:3001/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'click', page }),
            }).catch(err => console.error('Error posting event:', err));
        };

        window.addEventListener('click', handlePageClick);

        return () => {
            window.removeEventListener('click', handlePageClick);

            // Calculate the time spent on the page
            const leaveTime = Date.now();
            const duration = leaveTime - enterTime.current;

            fetch('http://localhost:3001/api/time', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page, duration }),
            }).catch(err => console.error('Error posting time data:', err));
        };
    }, [page]);
}

export default useTracking;
