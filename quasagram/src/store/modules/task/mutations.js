export default {
    setTasks(state, payload) {
        state.tasks = payload.obj;
    },
    setTasksRow(state, payload) {
        state.tasksRow = payload.obj;
    },
    setAsUsers(state, payload) {
        state.asUsers = payload.obj;
    },


};