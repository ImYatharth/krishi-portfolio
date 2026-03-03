import type { Core } from '@strapi/strapi';

const origins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];
if (process.env.FRONTEND_URL) origins.push(process.env.FRONTEND_URL);
if (process.env.STRAPI_PUBLIC_URL) origins.push(process.env.STRAPI_PUBLIC_URL);

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: origins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
