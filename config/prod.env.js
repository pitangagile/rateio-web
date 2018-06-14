module.exports = {
  // #region Environment
  NODE_ENV: '"production"',
  PROD_TIP: false,
  DEV_TOOLS: false,
  // #endregion Environment

  // #region App
  APP_NAME: '"SIRA"',
  APP_VERSION: '"1.0.0"',
  // #endregion App

  // #region Auth
  APP_AUTH_TOKEN_KEY: '"rateio-auth"',
  APP_AUTH_EXPIRES: '15', // in minutes
  APP_AUTH_USER_DETAILS:'"rateio-user-details"',
  // #endregion Auth
  // #region Api
  API: '"https://2zmssqmrpf.execute-api.us-east-1.amazonaws.com/dev/api/"',
  // #endregion Api
  // #region Social
  GOOGLE_CLIENT_ID: '"189232583533-hbi5ar1q3ov5uvd6e4g875mtk99g19br.apps.googleusercontent.com"',
  GOOGLE_REDIRECT_URI: '"http://pitang-rateio-dev.s3-website-us-east-1.amazonaws.com/internal"'
  // #region
};
