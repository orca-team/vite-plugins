import React from 'react';
import ReactDOM from 'react-dom/client';
import Comp from '@orca-fe/vite-plugin-react-convention-routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>
      Hello world
      <Comp />
    </div>
  </React.StrictMode>,
);
