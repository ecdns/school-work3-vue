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
                <q-input outlined v-model="inputTitle" name="title" label="Titre" class="col-9" />
              </div>
              <div class="row q-gutter-xl">
                <q-select outlined v-model="inputType" :options="types" name="types" label="types" class="col-4" />
                <q-select outlined v-model="inputResponsible" :options="users" label="Responsable" class="col-4" />
              </div>
              <div class="date">
                <div class="q-pa-md">
                  <div class="q-mb-sm">
                    <q-badge color="grey">
                      date: {{ inputDate }}
                    </q-badge>
                  </div>
                  <q-btn icon="event" round color="primary" @click="save">
                    <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="proxyDate" mask="DD--MM--YYYY">
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
                <q-input v-model="inputDescription" filled type="textarea" placeholder="Description" />
              </div>



              <div class="flex flex-center column q-my-md">
                <q-btn class="submit_button" outlined ripple label="Enregister" type="submit" color="primary" />

              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <!-- ACTION LIST -->
    <q-card class="my-card q-ma-lg" flat bordered v-for="(action, index) in actions" :key="index">
      <q-card-section horizontal @click="updateAction(index)" style="cursor:pointer">
        <q-card-section class="q-pt-xs">

          <!-- <q-badge transparent color="black" label="project.statut.label" /> -->

          <div class="text-h5 q-mt-sm q-mb-xs col-6">{{ action.type }} - {{ action.title }} </div>


          <div class="flex row">
            <q-chip>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
              {{ action.responsible }}
            </q-chip>
            <div class="text-overline ">{{ action.date }}</div>
          </div>
          <q-separator spaced class="q-mx-lg" />
          <div class="text-caption text-grey">{{ action.description }}</div>
        </q-card-section>
      </q-card-section>
      <!-- UPDATE ACTION POP UP -->
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      dialogVisible: false,
      calendarVisible: false,
      clickedAction: false,
      updateIndex: 0,



      type: '',
      responsible: '',
      title: '',
      date: '',
      description: '',



      proxyDate: '01-03-2023',
      types: [
        'Notes', 'Appel téléphonique', 'Contact email', 'Rappel', 'Rendez-vous'
      ],
      users: [
        'Clement Pavot', 'Léo Paillard', 'Tall Macky', 'Dorian Breuillard'
      ],


      actions: [
        {
          id: 1,
          type: "Note",
          responsible: "Clément PAVOT",
          title: "Négociation des prix",
          date: "18-05-2023",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
          id: 2,
          type: "Appel Téléphonique",
          responsible: "Leo Paillard",
          title: "Prise de contact",
          date: "06-04-2023",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },

      ]


    }
  },
  methods: {
    updateProxy() {
      this.proxyDate = this.date
    },

    save() {
      this.date = this.proxyDate
    },


    onSubmit() {
      this.actions.unshift(
        {
          id: 3,
          type: this.type,
          responsible: this.responsible,
          title: this.title,
          date: this.date,
          description: this.description,


        },

        this.dialogVisible = false
      )
    },

    updateAction(index) {
      this.clickedAction = true
      this.dialogVisible = true
      this.updateIndex = index
      // console.log(this.updateIndex)
    }


  },
  computed: {

    inputType: {
      get() {
        return this.clickedAction ? this.actions[this.updateIndex].type : this.type;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.updateIndex].type = value;
        } else {
          this.type = value;
        }
      }
    },
    inputResponsible: {
      get() {
        return this.clickedAction ? this.actions[this.updateIndex].responsible : this.responsible;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.updateIndex].responsible = value;
        } else {
          this.responsible = value;
        }
      }
    },
    inputTitle: {
      get() {
        return this.clickedAction ? this.actions[this.updateIndex].title : this.title;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.updateIndex].title = value;
        } else {
          this.title = value;
        }
      }
    },
    inputDate: {
      get() {
        return this.clickedAction ? this.actions[this.updateIndex].date : this.date;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.updateIndex].date = value;
        } else {
          this.date = value;
        }
      }
    },
    inputDescription: {
      get() {
        return this.clickedAction ? this.actions[this.updateIndex].description : this.description;
      },
      set(value) {
        if (this.clickedAction) {
          this.actions[this.updateIndex].description = value;
        } else {
          this.description = value;
        }
      }
    },

  }
}
</script>

<style lang="sass">

</style>


