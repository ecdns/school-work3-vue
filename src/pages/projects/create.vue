<template>
    <div class="q-pa-md" style="max-width: 400px">

        <q-form @submit.prevent.stop="onSubmit">
            <div class="row flex flex-center">
                <div class="col-10 ">
                    <div class="row justify-around q-my-sm">
                        <q-input outlined v-model="project.name" name="name" label="Nom" class=" input col-5" />
                        <q-input outlined v-model="project.description" name="description" label="Description"
                            class=" input col-5" />
                    </div>
                    <div class="row justify-around q-my-sm">
                        <q-input outlined v-model="project.company_id" name="company" label="Entreprise"
                            class=" input col-5" />
                        <q-input outlined v-model="project.creator_id" name="creator" label="Créateur"
                            class=" input col-5" />
                    </div>
                    <div class="row justify-around q-my-sm">
                        <q-input outlined v-model="project.customer_id" name="client" label="Client" class=" input col-5" />
                        <q-input outlined v-model="project.project_status" name="status" label="Statut"
                            class=" input col-5" />
                    </div>
                    <div class="flex flex-center q-py-md">
                        <q-btn outlined ripple label="Créer un projet" type="submit" color="primary" />
                    </div>
                </div>
            </div>
        </q-form>

    </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useResource } from 'src/composables/resources'

export default {
    setup() {
        const q = useQuasar()
        const projects = useResource('project')
        const name = ref(null)
        const age = ref(null)
        const accept = ref(false)

        return {
            q,
            name,
            age,
            accept,
            projects
        }
    },
    data() {
        return {
            project: {}
        }
    },
    methods: {
        onSubmit() {
            this.projects.create(this.project).then(() => {
                this.q.notify({
                    position: "top",
                    type: "positive",
                    message: `Le projet a bien été créé`,
                });
            }).catch(() => {
                this.q.notify({
                    position: "top",
                    type: "negative",
                    message: `Erreur lors de la création du projet`,
                });
            })
        }
    }
}
</script>