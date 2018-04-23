/* eslint-disable */
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  // #region Environment
  NODE_ENV: '"development"',
  PROD_TIP: false,
  DEV_TOOLS: true,
  // #endregion Environment

  // #region Auth
  APP_AUTH_TOKEN_KEY: '"rateio-auth"',
  APP_AUTH_EXPIRES: '15', // in minutes
  APP_AUTH_USER_DETAILS:'"rateio-user-details"',
  // #endregion Auth

  // #region Api
  API: '"http://localhost:3000/api/"',
  // #endregion Api

  // #region Social
  GOOGLE_CLIENT_ID: '"189232583533-hbi5ar1q3ov5uvd6e4g875mtk99g19br.apps.googleusercontent.com"',
  GOOGLE_REDIRECT_URI: '"http://localhost:8080/internal"'
  // #region
});
