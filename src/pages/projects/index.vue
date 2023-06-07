<template>
    <div class="q-pa-md fit flex row justify-center">
        <SearchBar :data="items" />
        <q-btn icon="add" color="primary" label="Nouveau projet" @click="router.push('/projects/create')" />
    </div>
    <q-form @submit="projectsFilter(val)" class="q-gutter-md" greedy>
        <div class="q-ma-md">
            <q-checkbox v-model="ended" val="6" label="Terminé" color="teal" />
            <q-checkbox v-model="inprogress" val="7" label="En cours" color="orange" />
            <q-checkbox v-model="wait" val="8" label="En attente" color="yellow" />
            <q-checkbox v-model="canceled" val="9" label="Annulé" color="red" />
            <q-checkbox v-model="stopped" val="10" label="En pause" color="blue" />
            <q-btn label="Filtrer" type="submit" color="primary" flat class="q-ml-sm"></q-btn>
        </div>
    </q-form>
    <ProjectList :projects="items" />
    <q-pagination class="q-mb-md" v-model="current" :max="5" />
</template>

<script>

import ProjectList from 'src/components/ProjectList.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from 'src/components/SearchBar.vue';
import { useResource } from 'src/composables/resources';

export default {
    components: {
        ProjectList,
        SearchBar
    },
    setup() {
        const router = useRouter();
        const projects = useResource('project');
        return {
            router,
            stopped: ref(false),
            ended: ref(false),
            inprogress: ref(false),
            wait: ref(false),
            canceled: ref(false),
            current: 1,
            projects
        }
    },
    created() {
        this.reloadData();
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        reloadData() {
            this.projects.list().then((res) => {
                this.items = res.data
            })
        },
        projectsFilter(val) {
            console.log(val)
        }
    }
}

</script>