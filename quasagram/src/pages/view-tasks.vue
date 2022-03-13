<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col"></div>
      <div class="col">
        <q-select
          :dense="true"
          filled
          v-model="tableName"
          :options="options"
          label="Filled"
        />
      </div>
      <div class="col">
        <q-btn
          color="primary"
          icon="search"
          label="Carica"
          @click="loadTasks"
        />
      </div>
      <div class="col"></div>
    </div>
<br>
<br>
    <div class="q-pa-md">
        <q-table  class="my-sticky-header-table" :loading="loading" :rows="rows" row-key="name"
      :rows-per-page-options="[0, 8, 18]" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      loading: false,
      model: ref(null),
      options: [
        "ROLE_USER",
        "ROLE_HEAD",
        "ROLE_ROW",
        "ROLE_CHANGE",
        "ROLE_PENDING_TASK",
      ],
      rows: [],
      tableName: "ROLE_USER",
    };
  },
  methods: {
    async loadTasks() {
      this.loading = true;
      console.log(this.tableName);
      try {
        await this.$store.dispatch("task/getTasks", this.tableName);
        this.rows = this.$store.getters["task/getTask"];
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
  created() {
    this.loadTasks();
  },
};
</script>


<style lang="sass">
.q-table--dense .q-table thead tr
  height: 45px

.my-sticky-header-table
  height: 600px

  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #eeeeee
</style>

