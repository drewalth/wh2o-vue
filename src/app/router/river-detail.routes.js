export default [
  {
    path: '/river-creator',
    component: () => import('@/app/views/river-detail/river-creator.vue')
  },
  {
    path: '/content/River/detail/id/:id',
    redirect: '/river-detail/:id/main',
    component: () => import('@/app/views/river-detail/river-detail.vue')
  },
  {
    path: '/river-detail/:id',
    name: 'river-detail',
    redirect: '/river-detail/:id/main',

    component: () => import('@/app/views/river-detail/river-detail.vue'),
    children: [
      {
        path: 'main',
        name: 'main-tab',
        meta: {
          crumbLabel: 'River Detail',
          transitionName: 'slide'
        },
        component: () => import('@/app/views/river-detail/components/main-tab/main-tab.vue')
      },
      {
        path: 'flow',
        name: 'flow-tab',
        meta: {
          crumbLabel: 'River Detail',
          transitionName: 'slide'
        },
        component: () => import('@/app/views/river-detail/components/flow-tab/flow-tab.vue')
      },
      {
        path: 'map',
        name: 'map-tab',
        meta: {
          crumbLabel: 'River Detail',
          transitionName: 'slide'
        },
        component: () => import('@/app/views/river-detail/components/map-tab/map-tab.vue')
      },
      {
        path: 'gallery',
        name: 'gallery-tab',
        meta: {
          crumbLabel: 'River Detail',
          transitionName: 'slide'
        },
        component: () => import('@/app/views/river-detail/components/gallery-tab.vue'),
        children: [
          {
            path: ':photoId',
            name: 'photo-detail',
            meta: {
              crumbLabel: 'Photo',
              transitionName: 'slide'
            },
            component:  () => import('@/app/views/river-detail/components/image-gallery/image-gallery.vue')
          }
        ]
      },
      {
        path: 'accidents',
        name: 'accidents-tab',
        meta: {
          crumbLabel: 'River Detail',
          transitionName: 'slide'
        },
        component: () => import('@/app/views/river-detail/components/accidents-tab.vue')
      },
      {
        path: 'credits',
        name: 'credits-tab',
        meta: {
          crumbLabel: 'River Detail',
          transitionName: 'slide'
        },
        component: () => import('@/app/views/river-detail/components/credits-tab.vue')
      },
      {
        path: 'news',
        name: 'news-tab',
        meta: {
          crumbLabel: 'River Detail',
          transitionName: 'slide'
        },
        component: () => import('@/app/views/river-detail/components/news-tab/news-tab.vue')
      }
    ]
  }
]
