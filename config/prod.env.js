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
  // API: '"https://2zmssqmrpf.execute-api.us-east-1.amazonaws.com/dev/api/"',
  API: '"https://r4bpvs07a9.execute-api.us-east-1.amazonaws.com/dev/api/"',

  // #endregion Api
  // #region Social
  GOOGLE_CLIENT_ID: '"7851358069-425t3ttd7479mp67hut4f0k9u6dj530n.apps.googleusercontent.com"',
  GOOGLE_REDIRECT_URI: '"http://s3sira.pitang.com.s3-website-us-east-1.amazonaws.com/internal"'
  // #region
};
