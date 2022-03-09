const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('pages/view-tasks')
            },
            {
                path: 'home',
                component: () =>
                    import ('pages/home.vue')
            },
            {
                path: 'create',
                component: () =>
                    import ('pages/create-task')
            },
            {
                path: 'view-tasks',
                component: () =>
                    import ('pages/view-tasks')
            }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes