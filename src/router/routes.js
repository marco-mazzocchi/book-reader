const routes = [
  {
    path: '/',
    alias: '/books',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BookList.vue') }]
  },
  {
    path: '/book/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BookTracks.vue') }]
  },
  {
    path: '/downloads',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/', component: () => import('pages/Downloads.vue') }]
  },
  {
    path: '/credits',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/', component: () => import('pages/Credits.vue') }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
