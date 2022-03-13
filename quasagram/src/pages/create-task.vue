<template>
  <div class="q-pa-lg">
    <q-card class="my-card">
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          rounded-borders
        >
          <div class="q-gutter-md row items-start q-pb-sm">
            <q-input
              v-model="cantina"
              label="Cantina *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val.length <= 2) ||
                  '2 stringhe massimo e non blank',
              ]"
            />

            <q-input
              v-model="tipoOp"
              label="Tipo operazione *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val.length <= 4) ||
                  '4 stringhe massimo e non blank',
              ]"
            />

            <q-select
              v-model="operator"
              :options="asUsers"
              label="Operatore *"
            />

            <q-input v-model="status" label="Status *" />

            <div>
              <q-btn
                label="Crea"
                icon="add"
                class="q-ml-md"
                size="15px"
                glossy
                type="submit"
                color="primary"
              />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <br />

    <q-table
      color="primary"
      class="my-sticky-header-table"
      :columns="columns"
      :loading="loading"
      :rows="tasks"
      row-key="name"
      dense
      :rowsPerPage="5"
      :rows-per-page-options="[0, 8, 18]"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="md"
              class="q-mr-md"
              dense
              @click="insertRow(props.row.ID)"
              round
              color="primary"
              icon="add"
            />
            <q-btn
              size="md"
              dense
              @click="deleteBtnHead(props.row.ID)"
              round
              color="negative"
              icon="delete"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            @click.native="loadTasksRow(props.row.ID)"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.ID }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <br />

    <q-table
      v-if="tasksRow.length > 0"
      color="primary"
      class="my-sticky-header-table"
      :loading="loadingRows"
      :rows="tasksRow"
      :columns="columnsRow"
      row-key="name"
      selection="single"
      dense
      :rows-per-page-options="[0, 8, 18]"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="md"
              dense
              @click="deleteBtnRow(props.row.ID)"
              round
              color="negative"
              icon="delete"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.ID }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <br />
    <br />

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-form
            @submit="onSubmitRow(lastTaskHeadIdBackUp)"
            @reset="onResetRow"
            class="q-gutter-md"
            rounded-borders
          >
            <div class="q-gutter-md row items-start q-pb-sm">
              <q-input
                v-model="tipoRiga"
                label="Tipo riga *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0 && val.length <= 2) ||
                    '2 stringhe massimo e non blank',
                ]"
              />

              <q-input
                v-model="subVas"
                label="Soggetto vaso *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length <= 10) || '10 stringhe massimo',
                ]"
              />

              <q-input
                v-model="vaso"
                label="Codice vaso *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0 && val.length <= 10) ||
                    'Non puo essere blank e > 10',
                ]"
              />

              <q-input
                type="number"
                v-model="quantita"
                label="Quantità *"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val > 0) || 'Scrivere una quantià',
                ]"
              />
              <div>
                <q-btn
                  label="Crea"
                  icon="add"
                  class="q-ml-md"
                  size="15px"
                  glossy
                  type="submit"
                  color="primary"
                  v-close-popup
                />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { date } from "quasar";
import { api } from "boot/axios";
const $q = useQuasar();

const cantina = ref(null);
const tipoOp = ref(null);
const operator = ref(null);
const status = ref(null);

const tipoRiga = ref(null);
const subVas = ref(null);
const vaso = ref(null);
const quantita = ref(null);

const confirm = ref(false);

export default {
  data() {
    return {
      loading: false,
      loadingRows: false,
      lastTaskHeadIdBackUp: null,
      cantina,
      tipoOp,
      operator,
      status,
      asUsers: [],
      //
      tipoRiga,
      subVas,
      vaso,
      quantita,
      headId: null,
      //
      confirm,
      tasks: [],
      tasksRow: [],
      usersAsJson: [],
      columns: [
        {
          name: "ID",
          label: "ID",
          field: "ID",
          sortable: true,
        },
        {
          name: "CANTINA",
          label: "CANTINA",
          field: "CANTINA",
          sortable: true,
        },
        {
          name: "OPERATOR",
          label: "OPERATORE",
          field: "OPERATOR",
          sortable: true,
        },
        {
          name: "TIPO_OP",
          label: "TIPO OPERAZIONE",
          field: "TIPO_OP",
          sortable: true,
        },
        {
          name: "STATUS",
          label: "STATO",
          field: "STATUS",
          sortable: true,
        },
        {
          name: "DATE",
          label: "DATA",
          field: "DATE",
          sortable: true,
        },
      ],
      columnsRow: [
        {
          name: "ID",
          label: "ID",
          field: "ID",
          sortable: true,
        },

        {
          name: "HEAD_ID",
          label: "ID TASK",
          field: "HEAD_ID",
          sortable: true,
        },
        {
          name: "ROW_TYPE",
          label: "TIPO RIGA",
          field: "ROW_TYPE",
          sortable: true,
        },
        {
          name: "SUBJ_VASE",
          label: "SOGGETTO VASO",
          field: "SUBJ_VASE",
          sortable: true,
        },
        {
          name: "CODE_VASE",
          label: "CODICE VASO",
          field: "CODE_VASE",
          sortable: true,
        },
        {
          name: "QUANTITY",
          label: "QUANTITÀ",
          field: "QUANTITY",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    doTest(e) {
      alert(e);
    },

    insertRow(taskHeadId) {
      this.confirm = true;
      this.lastTaskHeadIdBackUp = taskHeadId;
    },

    deleteBtnHead(taskId) {
      this.$q
        .dialog({
          title: "Confirm",
          message:
            "Vuoi cancellare il task:" +
            taskId +
            " ? Attenzione tutte le righe collegate a questo task verranno cancellate!",
          ok: {
            push: true,
          },
          cancel: {
            push: true,
            color: "negative",
          },
          persistent: true,
        })
        .onOk(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "delete",
            message: "Task cancellato con successo",
          });
          this.deleteTaskHead(taskId);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    async deleteTaskHead(taskId) {
      // do the delete
      try {
        const actionPayload = {
          id: taskId,
        };
        await this.$store.dispatch("task/deleteTaskHead", actionPayload);

        this.loadTasks();
        this.loadTasksRow();
      } catch (error) {
        this.error =
          "Can't delete this event because it's used!" ||
          "Failed to authenticate";
      }
    },

    deleteBtnRow(taskRowId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Vuoi cancellare il task:" + taskRowId + " ?",
          ok: {
            push: true,
          },
          cancel: {
            push: true,
            color: "negative",
          },
          persistent: true,
        })
        .onOk(() => {
          this.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "delete",
            message: "Task cancellato con successo",
          });
          this.deleteTaskRow(taskRowId);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    async deleteTaskRow(taskRowId) {
      //    alert(taskRowId)

      // do the delete
      try {
        const actionPayload = {
          id: taskRowId,
        };
        await this.$store.dispatch("task/deleteTaskRow", actionPayload);
        this.loadAfterDeletTasksRow(this.lastTaskHeadIdBackUp);
      } catch (error) {
        this.error =
          "Can't delete this event because it's used!" ||
          "Failed to authenticate";
      }
    },

    async loadTasks() {
      this.loading = true;
      try {
        await this.$store.dispatch("task/getTasks", "ROLE_HEAD");
        this.tasks = this.$store.getters["task/getTask"];
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async loadTasksRow(taskHeadId) {
      this.lastTaskHeadIdBackUp = taskHeadId;
      this.loadingRows = true;
      try {
        await this.$store.dispatch("task/getTasks", "ROLE_ROW");
        this.tasksRow = this.$store.getters["task/getTaskRow"].filter((el) => {
          return el.HEAD_ID === taskHeadId;
        });
        this.loadingRows = false;
      } catch (error) {
        console.log(error);
        this.loadingRows = false;
      }
    },

    async loadAsUsers() {
      try {
        await this.$store.dispatch("task/getAsUsers");
        this.usersAsJson = this.$store.getters["task/getAsUsers"];

        this.asUsers = [];
        this.usersAsJson.forEach((element) => {
          this.asUsers.push(element.AS_USER);
        });
        this.operator = this.asUsers[0];
      } catch (error) {
        console.log(error);
        this.loadingRows = false;
      }
    },

    async loadAfterDeletTasksRow(taskHeadId) {
      this.loadingRows = true;
      try {
        await this.$store.dispatch("task/getTasks", "ROLE_ROW");
        this.tasksRow = this.$store.getters["task/getTaskRow"].filter((el) => {
          return el.HEAD_ID === taskHeadId;
        });
        this.loadingRows = false;
      } catch (error) {
        console.log(error);
        this.loadingRows = false;
      }
    },

    async addTask() {
      const timeStamp = Date.now();

      const actionPayload = {
        cantina: cantina.value,
        tipo_op: tipoOp.value,
        operator: operator.value,
        status: status.value ? status.value : "",
        date: date.formatDate(timeStamp, "YYYYMMDD"),
      };

      try {
        await this.$store.dispatch("task/addTaskHead", actionPayload);
        this.loadTasks();
        // this.onReset()
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
        console.log(error);
      }
    },

    async addTaskRow(headId) {
      const actionPayload = {
        head_id: headId,
        tipoRiga: tipoRiga.value,
        subVas: subVas.value,
        vaso: vaso.value,
        quantita: quantita.value,
      };

      try {
        await this.$store.dispatch("task/addTaskRow", actionPayload);
        this.loadTasksRow(headId);
        // this.onReset()
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
        console.log(error);
      }

      // send telegram bot message
      //https://api.telegram.org/bot5122590653:AAHxT90EEDOOQoNupWdhGPmRPQ9WYNC7Zj4/sendMessage?chat_id=1816191132&text=Nuovo lavoro da fare per te %F0%9F%91%8F 😂 😂  😂    Vai alla lista dei To Do Task per vedere il task.
    },

    onSubmit() {
      if (
        cantina.value.length > 0 &&
        tipoOp.value.length > 0 &&
        operator.value.length > 0
      ) {
        this.addTask();
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      }
    },

    onSubmitRow(headId) {
      if (
        tipoRiga.value.length > 0 &&
        subVas.value.length > 0 &&
        vaso.value.length > 0 &&
        quantita.value.length > 0
      ) {
        this.addTaskRow(headId);
        this.sendMessageTelegram(headId);
        this.onResetRow();
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      }
    },

    sendMessageTelegram(headId) {
      var userArray = this.usersAsJson.filter(
        (i) => i.AS_USER === this.operator
      );
      const idUserTelegram = userArray[0].BOT_ID;
      const botToken = "5174941088:AAEFuzWWNKPwyyJQ_M53WlxRhoWrKVgsPXM"
      // non la mia
      const botToken_2 = "5122590653:AAHxT90EEDOOQoNupWdhGPmRPQ9WYNC7Zj4";
      const urlToSend =
        "https://api.telegram.org/bot" +
        botToken +
        "/sendMessage?chat_id=" +
        idUserTelegram +
        "&text=Nuovo lavoro da fare per te! 😂 😂 😂 . \n Vai alla lista dei To Do Task per vedere il task: " +
        headId + " Tipo riga: " + tipoRiga.value + " Vaso: " + vaso.value + " Quantità: " + quantita.value;

      console.log(urlToSend);

      this.$axios.get(urlToSend).then((res) => {
        console.log(res);
      });
    },

    onReset() {
      this.cantina = null;
      this.tipoOp = null;
      this.operator = null;
      this.status = null;
    },
    onResetRow() {
      this.tipoRiga = null;
      this.subVas = null;
      this.vaso = null;
      this.quantita = null;
    },
  },
  created() {
    this.loadTasks();
    this.loadAsUsers();
  },
};
</script>

<style lang="sass">
.q-table--dense .q-table thead tr
  height: 45px

.my-sticky-header-table
  height: 310px

  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #eeeeee
</style>
