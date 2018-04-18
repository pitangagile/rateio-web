import variables from '../helpers/variables';

function getAuthMetadata() {
  try {
    const authMetadata = JSON.parse(localStorage.getItem(variables.auth.appToken));

    return authMetadata;
  } catch (e) {
    return undefined;
  }
}

function isAuthMetadataValid() {
  const metadata = getAuthMetadata();

  return metadata && metadata.expires > new Date().getTime() && metadata.token;
}

const NavigationGuards = {
  beforeEnter(to, from, next) {
    const requiresAuth = to.matched.some(route => route.meta.requiresAuth);

    if (requiresAuth) {
      if (isAuthMetadataValid()) {
        next();
      } else {
        next({
          name: 'signin',
          params: {
            notify: {
              body: 'You must enter your credentials.',
              type: 'warning',
              config: {
                position: 'centerTop',
              },
            },
          },
        });
      }
    } else {
      next();
    }
  },

  beforeUpdate(to, from, next) {
    this.beforeEnter(to, from, next);
  },
};

export default NavigationGuards;
