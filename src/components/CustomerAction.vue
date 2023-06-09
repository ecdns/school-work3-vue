<template>
  <q-page>
    <div class="row ">
      <div class="text-h6 q-mr-lg" @click="testFunction">Action ({{ actions.length }})</div>

      <!-- CREATE ACTION FORM POP UP -->
      <q-btn push outline rounded color="primary" icon="add" @click="dialogVisible = true"></q-btn>
      <q-dialog v-model="dialogVisible" @hide="clickedAction = false" position="absolute" transition-show="slide-up"
        transition-hide="slide-down" class="flex flex-center column">
        <q-card style="min-width: 70vw">
          <q-card-section>
            <div class="row flex justify-end"> <q-icon v-close-popup name="close" size="1.5rem" style="cursor:pointer" />
            </div>
            <q-form action="" method="post" @submit.prevent.stop="onSubmit">
              <div class="text-h6">Fredy Frozen</div>
              <q-separator color="primary" class="q-my-md" />
              <div class="row q-my-md">
                <q-input outlined :rules="inputRules" v-model="inputTitle" name="title" label="Titre" class="col-9" />
              </div>
              <div class="row q-gutter-xl">
                <q-select outlined v-model="inputType" :options="taskTypeList" option-label="name" option-value="id"
                  name="types" label="types" class="col-4" />
                <q-select outlined v-model="inputStatus" :options="taskStatusList" option-label="name" option-value="id"
                  name="status" label="Statut" class="col-4" />
              </div>

              <div class="dueDate">
                <div class="q-pa-md">
                  <div class="q-mb-sm">
                    <q-badge color="grey">
                      dueDate: {{ inputdueDate }}
                    </q-badge>
                  </div>
                  <q-btn icon="event" round color="primary" @click="save">
                    <q-popup-proxy @before-show="updueDateProxy" cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="proxydueDate" mask="DD--MM--YYYY">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn label="Cancel" color="primary" flat v-close-popup />
                          <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>
              </div>
              <div style="max-width: 60vw">
                <q-input :rules="inputRules" v-model="inputDescription" filled type="textarea"
                  placeholder="Description" />
              </div>
              <div class="flex flex-center column q-my-md">
                <q-btn class="submit_button" outlined ripple label="Enregister" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <!-- CREATE ACTION FORM POP UP -->

    <!-- ACTION LIST -->
    <div v-if="actions.length != 0">
      <q-card class="my-card q-ma-lg" flat bordered v-for="(action, index) in actions" :key="index">
        <!-- delte icon  : -->
        <div class="flex justify-end q-mx-md q-mt-xs" style="cursor:pointer"> <q-icon name="delete" size="1.5rem"
            @click="confirm = true" />
        </div>
        <div><q-badge color="primary">Statut: </q-badge> {{ action.taskStatus.name }}</div>
        <q-card-section horizontal>

          <div>

          </div>
          <q-card-section class="q-pt-xs" @click="updateDateAction(index)" style="cursor:pointer">
            <div class="text-h5 q-mt-sm q-mb-xs col-6"> {{ action.taskTypes.name }} - {{ action.title }} </div>

            <div class="flex row">
              <q-chip>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                </q-avatar>
                {{ action.users.firstName }}
              </q-chip>
              <div class="text-overline ">{{ action.dueDate }}</div>
            </div>
            <q-separator spaced class="q-mx-lg" />
            <div class="text-caption text-grey">{{ action.description }}</div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div v-else>
      <div class=" flex flex-center">
        <q-icon size="10rem" name="block"></q-icon>
      </div>
      <div class="text-h4 q-my-md" style="text-align: center">Aucune action n'est associée à ce client</div>
    </div>
    <!-- ACTION LIST -->

    <!-- DELETE ACTION CONFIRMATION -->
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Voulez-vous vraiment supprimer cette action ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="OUI" color="red" @click="deleteAction(clickedActionIndex)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- DELETE ACTION CONFIRMATION -->

  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useResource } from 'src/composables/resources'
import { useRoute } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

export default {
  setup() {
    const route = useRoute()
    const auth = useAuthStore()
    return {
      route,
      auth
    }
  },
  data() {
    return {
      dialogVisible: false,
      calendarVisible: false,
      clickedAction: false,
      clickedActionIndex: 0,
      confirm: ref(false),
      tasks: useResource(`task/project/${this.route.params.id}`),
      taskAdd: useResource("task"),
      taskTypes: useResource("taskType"),
      taskStatus: useResource("taskStatus"),

      taskStatusList: [],
      taskTypeList: [],
      type: '',
      status: '',
      creator: '',
      title: '',
      dueDate: '',
      description: '',

      inputRules: [
        val => (val && val.length > 0) || "Une information est manquante"
      ],

      proxydueDate: '01-03-2023',
      types: [
        'Notes', 'Appel téléphonique', 'Contact email', 'Rappel', 'Rendez-vous'
      ],

      actions: []
    }
  },
  methods: {
    releaoData() {

      this.taskStatus.list().then((res) => {
        this.taskStatusList = res.data
      })
      this.taskTypes.list().then((res) => {
        this.taskTypeList = res.data
      })
      this.tasks.listWithoutAll().then((res) => {
        // console.log(res.data[1])
        res.data.forEach(task => {
          this.actions.push(task)
        });
        console.log(this.actions[2])
      })
    },
    updueDateProxy() {
      this.proxydueDate = this.dueDate
    },
    save() {
      this.dueDate = this.proxydueDate
    },
    onSubmit() {

      console.log({
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        project: parseInt(this.route.params.id),
        users: this.auth.me.id,
        taskType: this.type.id,
        location: "location 1",
        taskStatus: this.status.id
      })
      // console.log(this.input)
      if (!this.clickedAction) {
        // console.log(this.type.id)
        this.taskAdd.create(JSON.stringify({
          title: this.title,
          description: this.description,
          dueDate: this.dueDate,
          project: parseInt(this.route.params.id),
          users: this.auth.me.id,
          taskType: this.type.id,
          location: "location 1",
          taskStatus: this.status.id
        })).then((res) => {
          console.log(res)
        })
      } else {

        this.taskAdd.update(this.actions[this.clickedActionIndex].id, (JSON.stringify({
          title: this.inputTitle,
          description: this.inputDescription,
          dueDate: this.inputdueDate,
          project: this.route.params.id,
          users: this.auth.me.id,
          taskTypes: this.inputTypeId,
          location: "location 1",
          taskStatus: this.inputStatusId
        }))).then((res) => {
          console.log(res)
        })
      }
      this.dialogVisible = false
    },

    updateDateAction(index) {
      this.clickedAction = true
      this.dialogVisible = true
      this.clickedActionIndex = index
    },

    deleteAction(index) {
      this.actions.splice(index, 1)
      console.log(this.actions[index].id)
      this.taskAdd.delete(this.actions[index].id).then((res) => {
        console.log(res)
      })
    },

  },
  computed: {


    inputTypeId: {
      get() {
        return this.clickedAction ? this.actions[this.clickedActionIndex].taskTypes.id : this.type.id;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.clickedActionIndex].taskTypes.id = value;
        } else {
          this.type.id = value;
        }
      }
    },


    inputTitle: {
      get() {
        return this.clickedAction ? this.actions[this.clickedActionIndex].title : this.title;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.clickedActionIndex].title = value;
        } else {
          this.title = value;
        }
      }
    },
    inputdueDate: {
      get() {
        return this.clickedAction ? this.actions[this.clickedActionIndex].dueDate : this.dueDate;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.clickedActionIndex].dueDate = value;
        } else {
          this.dueDate = value;
        }
      }
    },
    inputDescription: {
      get() {
        return this.clickedAction ? this.actions[this.clickedActionIndex].description : this.description;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.clickedActionIndex].description = value;
        } else {
          this.description = value;
        }
      }
    },
    inputStatusId: {
      get() {
        return this.clickedAction ? this.actions[this.clickedActionIndex].taskStatus.id : this.status.id;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.clickedActionIndex].taskStatus.id = value;
        } else {
          this.status.id = value;
        }
      }
    },
    inputStatus: {
      get() {
        return this.clickedAction ? this.actions[this.clickedActionIndex].taskStatus.name : this.status;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.clickedActionIndex].taskStatus.name = value;
        } else {
          this.status = value;
        }
      }
    },
    inputType: {
      get() {
        return this.clickedAction ? this.actions[this.clickedActionIndex].taskTypes.name : this.type;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.clickedActionIndex].taskTypes.name = value;
        } else {
          this.type = value;
        }
      }
    },

  },
  created() {
    this.releaoData()
  }
}
</script>

<style lang="sass">

</style>


