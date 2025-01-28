import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import '@fontsource/inter';

import { createTheme, MantineProvider } from '@mantine/core';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
});

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <MantineProvider theme={theme}>
        <App {...props} />
      </MantineProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
