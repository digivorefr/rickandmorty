/* istanbul ignore file */
import { RouteConfig } from 'vue-router';
import Home from 'scripts/pages/Home.vue';
import Characters from 'scripts/pages/Characters.vue';
import Character from 'scripts/pages/Character.vue';
import NotFound from 'scripts/pages/NotFound.vue';

export default <RouteConfig[]>[
  { path: '/', component: Home, name: 'Home' },
  { path: '/characters', component: Characters, name: 'Characters' },
  { path: '/characters/:id', component: Character, name: 'Character' },
  { path: '*', component: NotFound, name: 'Not Found' },
];
