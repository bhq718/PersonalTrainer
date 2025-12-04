import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter , RouterProvider } from 'react-router';

import Customerlist from './components/Customerlist.tsx';
import Trainingslist from './components/Trainingslist.tsx';

const router = createBrowserRouter([  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    children: [                       // children are nested routes with a route
      {
        element: <Customerlist />,
        index: true                   // index route does not need any path
      },
      {
        path: "/trainings",                // path can be defined relative to the parent path
        element: <Trainingslist />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
