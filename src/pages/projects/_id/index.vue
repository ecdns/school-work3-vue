<template>
    <q-page class="fit">
        <q-card class="q-ma-md">
            <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
            <q-tabs v-model="tab" dense class="bg-grey-3 text-grey-7" active-color="primary" indicator-color="purple"
                align="justify">
                <q-tab name="details" label="Détails" />
                <q-tab name="contract" label="Contrat" />
                <q-tab name="action" label="Action" />
                <q-tab name="bill" label="Facture" />
                <q-tab name="documents" label="Documents" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="details">
                    <q-form action="" method="post" @submit.prevent.stop="onSubmit">
                        <q-icon @click="UpdateProject" :name="updateDataIcon" size="2em" color="primary"
                            class="q-ml-lg"></q-icon>
                        <div class="row flex flex-center">
                            <div class="col-10 ">
                                <div class="row justify-around q-my-sm">
                                    <q-input outlined :readonly="readOnlyData" v-model="project.name" name="name"
                                        label="Nom" class=" input col-5" />
                                    <q-input outlined :readonly="readOnlyData" v-model="project.description"
                                        name="description" label="Description" class=" input col-5" />
                                </div>
                                <div class="row justify-around q-my-sm">
                                    <q-input outlined :readonly="readOnlyData" v-model="project.company_id" name="company"
                                        label="Entreprise" class=" input col-5" />
                                    <q-input outlined :readonly="readOnlyData" v-model="project.creator_id" name="creator"
                                        label="Créateur" class=" input col-5" />
                                </div>
                                <div class="row justify-around q-my-sm">
                                    <q-input outlined :readonly="readOnlyData" v-model="project.customer_id" name="client"
                                        label="Client" class=" input col-5" />
                                    <q-input outlined :readonly="readOnlyData" v-model="project.project_status"
                                        name="status" label="Statut" class=" input col-5" />
                                </div>
                                <div class="flex flex-center q-py-md">
                                    <q-btn class="" outlined ripple label="Mettre à jour" :disable="!areDataUpdated"
                                        type="submit" color="primary" />
                                </div>
                            </div>
                        </div>
                    </q-form>
                </q-tab-panel>

                <q-tab-panel name="contract">
                    <div class="text-h6">Alarms</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="action">
                    <div class="text-h6">Movies</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="bill">
                    <div class="text-h6">Movies</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="documents">
                    <div class="text-h6">Movies</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>

<script>

import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useResource } from 'src/composables/resources';
import useQuasar from 'quasar/src/composables/use-quasar';

export default {
    setup() {
        const projects = useResource("project")
        const route = useRoute();
        const projectId = ref(route.params.id);
        const q = useQuasar();

        return {
            tab: ref("details"),
            route,
            projectId,
            projects,
            q
        };
    },
    created() {
        this.reloadData();
    },
    data() {
        return {
            project: {},
            readOnlyData: true,
            updateDataIcon: "lock",
        }
    },
    methods: {
        reloadData() {
            this.projects.get(this.route.params.id).then((res) => {
                this.project = res
            })
        },
        onSubmit() {
            this.projects.update(this.route.params.id, this.project).then((res) => {
                this.q.notify({
                    position: "top",
                    type: "positive",
                    message: `Le projet a bien été modifié`,
                });
            }).catch(() => {
                this.q.notify({
                    position: "top",
                    type: "negative",
                    message: `Erreur lors de la modification du projet`,
                });
            })
        },
        areDataUpdated() {
            if (this.lastName !== "Jhon") {
                return true;
            }
            return false;
        },
        UpdateProject() {
            this.readOnlyData = !this.readOnlyData,
                this.readOnlyData ? this.updateDataIcon = "lock" : this.updateDataIcon = "lock_open"

        },
    }
}

</script>
