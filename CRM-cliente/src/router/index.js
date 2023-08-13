import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/ClientesViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
      props: {titulo: 'Listado de Clientes'}
    },
    {
      path: '/agregar-cliente/',
      name: 'agregar-cliente',
      component: () => import('../views/NuevoClienteViews.vue'),
      props: {titulo: 'Agregar Clientes'}
    },
    {
      path: '/editar-cliente/:id',
      name: 'editar-cliente',
      component: () => import('../views/EditarClientesViews.vue'),
      props: {titulo: 'Editar Clientes'}
    },
  ]
})

export default router
