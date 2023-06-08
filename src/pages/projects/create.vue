<template>

    <q-tab-panel name="details">
        <q-form @submit.prevent.stop="onSubmit">
            <div class="column flex flex-center">
                    <div class="row justify-around ">
                        <q-input outlined v-model="project.name" name="name" label="Nom" class=" input col-6"
                            :aria-required="true" lazy-rules :rules="[
                                (val) =>
                                    (val !== null && val !== '') || 'Veuillez entrer un nom',
                            ]" />
                        <q-input outlined v-model="project.description" name="description" label="Description"
                            class=" input col-6" :aria-required="true" lazy-rules :rules="[
                                (val) =>
                                    val !== null ||
                                    val !== '' ||
                                    'Veuillez entrer une description'
                            ]" />
                    </div>
                    <div class="row justify-around ">
                        <q-input disable outlined v-model="project.company" name="company" label="Entreprise"
                            class=" input col-6" />
                        <q-input disable outlined v-model="project.creator" name="creator" label="Créateur"
                            class=" input col-6" />
                    </div>
                    <div class="row justify-around">
                        <div class="q-gutter-md row items-start">
                            <q-select filled v-model="project.customer" use-chips label="Choisir un client"
                                :options="customerList" style="width: 250px" option-label="email" option-value="id"
                                lazy-rules :rules="[
                                    (val) =>
                                        (val !== null && val !== '') ||
                                        'Veuillez sélectionner un client',
                                ]">
                            </q-select>
                        </div>
                        <div class="q-gutter-md row items-start">
                            <q-select filled v-model="project.projectStatus" use-chips label="Choisir un statut"
                                :options="statusList" style="width: 250px" option-label="name" option-value="id" lazy-rules
                                :rules="[
                                    (val) =>
                                        (val !== null && val !== '') ||
                                        'Veuillez sélectionner un statut',
                                ]">
                            </q-select>
                        </div>
                    </div>
                <div class="flex flex-center q-py-md">
                    <q-btn outlined ripple label="Créer un projet" type="submit" color="primary" />
                </div>
            </div>
        </q-form>
    </q-tab-panel>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useResource } from 'src/composables/resources'
import { useAuthStore } from 'src/stores/auth';

export default {
    setup() {
        const q = useQuasar();
        const projects = useResource('project');
        const name = ref(null);
        const age = ref(null);
        const accept = ref(false);
        const projectStatus = useResource('projectStatus');
        const customers = useResource('customer')
        const options = ref(null);
        const auth = useAuthStore();

        return {
            q,
            name,
            age,
            accept,
            projects,
            projectStatus,
            customers,
            options,
            auth
        }
    },
    data() {
        return {
            project: {},
            statusList: [],
            customerList: []
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.projectStatus.list().then((res) => {
                res.data.forEach(element => {
                    this.statusList.push(element);
                });
            })
            this.customers.list().then((res) => {
                res.data.forEach(element => {
                    this.customerList.push(element)
                })
            })
            this.project.company = this.auth.me.company;
            this.project.creator = this.auth.me.firstName;
        },
        onSubmit() {
            if (this.project.name && this.project.description && this.project.customer && this.project.projectStatus) {
                this.project.creator = this.auth.me.id;
                this.project.company = this.auth.me.company;
                this.project.customer = this.project.customer.id;
                this.project.projectStatus = this.project.projectStatus.id;
                this.projects.create(this.project).then(() => {
                    window.location.reload();
                    this.q.notify({
                        position: "top",
                        type: "positive",
                        message: `Le projet a bien été créé`,
                        timeout: 3000
                    });
                }).catch(() => {
                    this.q.notify({
                        position: "top",
                        type: "negative",
                        message: `Erreur lors de la création du projet`,
                    });
                })
            } else {
                this.q.notify({
                    position: "top",
                    type: "negative",
                    message: "Il manque des champs à remplir "
                })
                return
            }
        }
    }
}
</script>
