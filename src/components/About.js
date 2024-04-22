import React from 'react';
import useTracking from '../hooks/useTracking';

function About() {
  useTracking('About');
  return <h2>About Page</h2>;
}

export { About };

