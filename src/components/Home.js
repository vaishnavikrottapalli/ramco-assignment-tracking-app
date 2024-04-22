import React from 'react';
import useTracking from '../hooks/useTracking';

function Home() {
  useTracking('Home');
  return <h2>Home Page</h2>;
}

export { Home };
