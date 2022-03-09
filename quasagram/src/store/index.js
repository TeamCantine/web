import { createStore } from "vuex";

import taskModule from "./modules/task/index.js"


const store = createStore({
    modules: {
        //  auth: authModule,
        task: taskModule
    },
});

export default store;