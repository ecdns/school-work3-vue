<template>
  <q-page>
    <div class="row ">
      <div class="text-h6 q-mr-lg">Action (1)</div>
      <q-btn push outline rounded color="primary" icon="add" @click="dialogVisible = true"></q-btn>
      <q-dialog v-model="dialogVisible" position="absolute" transition-show="slide-up" transition-hide="slide-down"
        class="flex flex-center column">
        <q-card style="min-width: 70vw">
          <q-card-section>
            <q-form action="" method="post" @submit.prevent.stop="onSubmit">
              <div class="text-h6">Fredy Frozen</div>
              <q-separator color="primary" class="q-my-md" />
              <div class="row q-my-md">
                <q-input outlined v-model="title" name="title" label="Titre" class="col-9" />
              </div>
              <div class="row q-gutter-xl">
                <q-select outlined v-model="type" :options="types" name="types" label="types" class="col-4" />
                <q-select outlined v-model="responsible" :options="users" label="Responsable" class="col-4" />
              </div>
              <div class="date">
                <div class="q-pa-md">
                  <div class="q-mb-sm">
                    <q-badge color="grey">
                      date: {{ date }}
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
                <q-input v-model="description" filled type="textarea" placeholder="Description" />
              </div>



              <div class="flex flex-center column q-my-md">
                <q-btn class="submit_button" outlined ripple label="Enregister" type="submit" color="primary" />

              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>


    </div>
    <q-card class="my-card q-ma-lg" flat bordered v-for="(action, id) in actions" :key="id">
      <q-card-section horizontal>
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


        }
      )
    }
  }
}
</script>

<style lang="sass">

</style>


