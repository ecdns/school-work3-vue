<template>
    <q-page class="fit">
        <q-card class="q-ma-md">
            <q-card-section>
                <div class="text-h6">Our Changing Planet</div>
                <div class="text-subtitle2">by John Doe</div>
                <ProjectEditDialog />
            </q-card-section>
            <q-tabs v-model="tab" dense class="bg-grey-3 text-grey-7" active-color="primary" indicator-color="purple"
                align="justify">
                <q-tab name="details" label="Détails" />
                <q-tab name="contract" label="Contrat" />
                <q-tab name="action" label="Action" />
                <q-tab name="bill" label="Facture" />
                <q-tab name="documents" label="Documents" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="bg-primary text-white">
                <q-tab-panel name="details">
                    <div class="text-h6">Mails</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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

import ProjectEditDialog from 'src/components/ProjectEditDialog.vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const projectId = ref(route.params.id);
        return {
            tab: ref("details"),
            route,
            projectId
        };
    },
    components: { ProjectEditDialog }
}

</script>
