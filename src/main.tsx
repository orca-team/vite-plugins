import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from 'virtual:convention-routes';


const RoutesRenderer = () => useRoutes(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutesRenderer />
    </BrowserRouter>
    <pre>
      {JSON.stringify(routes, null, 2)}
    </pre>
  </React.StrictMode>,
);
