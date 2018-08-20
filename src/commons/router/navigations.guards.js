/* eslint-disable */
import variables from '../helpers/variables';

function getAuthMetadata() {
  try {
    const authMetadata = JSON.parse(localStorage.getItem(variables.auth.appToken));
    return authMetadata;
  } catch (e) {
    return undefined;
  }
}

function getRole() {
  try {
    const role = JSON.parse(localStorage.getItem(variables.auth.userRole));
    return role;
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
    if (to.path === '/external' && isAuthMetadataValid()) {
      next({ path: '/internal/' });
    } else if (requiresAuth) {
      if (isAuthMetadataValid()) {
        const roleAllowed = getRole() !== undefined && to.meta.roles.indexOf(getRole()) > -1;
        if (roleAllowed){
          next();
        } else{
          next({
            name: 'settings',
          });
        }
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
