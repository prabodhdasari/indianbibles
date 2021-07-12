import { createWebHistory, createRouter } from "vue-router"
import Protestant from '../components/bible2.vue'
import Catholic from '../components/catholicbible.vue'
//import About from '../components/about.vue'
import Parallel from '../components/parallel.vue'
import TeluguHymns from '../components/teluguhymns1.vue'
import TrinityHymns from '../components/trinityhymns1.vue'

const routes = [
  {
    
      path: "/",
      name: "protestant",
      component: Protestant,
    },
  {
    path: "/bible2",
    name: "Protestant",
    component: Protestant,
  
  },
  {
    path: "/catholic",
    name: "catholic",
    component: Catholic,
  },
 
  {
    path: "/parallel",
    name: "Parallel",
    component: Parallel,
  },
  {
    path: "/teluguhymns",
    name: "TeluguHymns",
    component: TeluguHymns,
  },
  {
    path: "/trinityhymns",
    name: "TrinityHymns",
    component: TrinityHymns,
  },
  { path: '/:pathMatch(.*)*', name: 'Protestant', component: Protestant },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;