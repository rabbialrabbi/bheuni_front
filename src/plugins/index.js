/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import store from '@/stores/vuex'
import {router} from '@/router'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueTablerIcons from 'vue-tabler-icons';
import VueSweetalert2 from 'vue-sweetalert2'
import { createMongoAbility } from '@casl/ability'
import { abilitiesPlugin } from '@casl/vue'
import {useCookie} from "@/_helper/useCookie";
import 'sweetalert2/dist/sweetalert2.min.css'

const userAbilityRules = useCookie('userAbilityRules')
const initialAbility = createMongoAbility(userAbilityRules.value ?? [])

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(store)
    .use(PerfectScrollbarPlugin)
    .use(VueTablerIcons)
    .use(VueSweetalert2)
    .use(abilitiesPlugin, initialAbility, {
    useGlobalProperties: true,
  })
}
