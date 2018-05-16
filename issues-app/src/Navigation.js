import React from 'react';
import { Link } from 'react-router-dom';

import './navigation.css';

const Navigation = () => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={"/issues"}>Issues</Link>
    </div>
    <div className="Navigation-link">
      <Link to={"/settings"}>Settings</Link>
    </div>
  </header>
);

export default Navigation;
