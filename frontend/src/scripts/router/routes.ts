/* istanbul ignore file */
import { RouteConfig } from 'vue-router';
import Characters from 'scripts/pages/Characters.vue';
import Character from 'scripts/pages/Character.vue';
import NotFound from 'scripts/pages/NotFound.vue';

export default <RouteConfig[]>[
  { path: '/', redirect: { name: 'Characters' } },
  { path: '/characters', component: Characters, name: 'Characters' },
  { path: '/characters/:id', component: Character, name: 'Character' },
  { path: '*', component: NotFound, name: 'Not Found' },
];
