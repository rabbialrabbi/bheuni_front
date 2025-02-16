import {useCookie} from "@/_helper/useCookie";
import {useAbility} from "@casl/vue";
import {router} from "@/router/index";

export const setupGuards = router => {

  router.beforeEach(to => {
    const ability = useAbility()

    /* for public route */
    if (to.meta.public)
      return

    /* For auth login*/
    const isLoggedIn = !!(useCookie('userData').value && useCookie('authToken').value)


    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn)
        return '/'
      else
        return undefined
    }

    let ableTo = to.matched.some(route => ability.can(route.meta.action, route.meta.subject))

    if (!ableTo && to.matched.length) {
      return isLoggedIn
        ? {name: 'Error 404'}
        : {
          name: 'Login',
          query: {
            ...to.query,
            to: to.fullPath !== '/' ? to.path : undefined,
          },
        }
    }
  })
}
