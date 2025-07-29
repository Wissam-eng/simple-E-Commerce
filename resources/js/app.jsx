import './bootstrap';
import '../css/app.css';

// import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




import React from 'react';
import ReactDOM from 'react-dom/client';
import { InertiaProgress } from '@inertiajs/progress';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  resolve: name => import(`./Pages/${name}`),
  setup({ el, App, props }) {
    ReactDOM.createRoot(el).render(<App {...props} />);
  },
});



InertiaProgress.init();
