<template>


  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col">

      </div>
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
        <q-btn color="primary" icon="search" label="Carica" @click="loadTasks" />
      </div>
      <div class="col">

      </div>
    </div>


  </div>

  <div class="q-pa-md">
    <q-table :rows="rows"  row-key="name" />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
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
      console.log(this.tableName);
      try {
        await this.$store.dispatch("task/getTasks", this.tableName);
        this.rows = this.$store.getters["task/getTask"];
      } catch (error) {
        //  console.log(error);
      }
    },
  },
  created() {
    this.loadTasks();
  },
};
</script>
