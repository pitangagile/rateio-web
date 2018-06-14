export default {
  env: {
    nodeEnv: process.env.NODE_ENV,
    prodTip: process.env.PROD_TIP,
    devTools: process.env.DEV_TOOLS,
  },
  app: {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
  },
  http: {
    root: process.env.API,
  },
  auth: {
    appToken: process.env.APP_AUTH_TOKEN_KEY,
    expires: parseInt(process.env.APP_AUTH_EXPIRES, 10),
    userdetais: process.env.APP_AUTH_USER_DETAILS,
  },
  social: {
    google: {
      issuer: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    },
  },
};
