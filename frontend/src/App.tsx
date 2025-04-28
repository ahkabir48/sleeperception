import React, { useEffect, useState } from 'react';

// const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setMessage('Error fetching message');
      });
  }, []);

  return (
    <div>
      <h1>Frontend running 🚀</h1>
      <h2>Backend says: {message}</h2>
    </div>
  );
}

export default App;
