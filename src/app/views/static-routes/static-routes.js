
const staticRoutes = [
  {
    path: '/',
    redirect: '/river-index'
  },
  {
    path: '/terms-of-service',
    name: 'terms-of-service',
    meta: {
      crumbLabel: 'Terms of Service'
    },
    component: () => import('./terms-of-service')
  },
  {
    path: '*',
    name: 'page-not-found',
    meta: {
      crumbLabel: '404'
    },
    component: () => import('./page-not-found')
  }
]

export default staticRoutes
