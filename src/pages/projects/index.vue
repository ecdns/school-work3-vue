<template>
    <div class="q-pa-md flex row justify-center">
        <SearchBar :data="items" />
        <q-btn icon="add" class="q-ml-md" color="primary" label="Nouveau projet" @click="router.push('/projects/create')" />
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
    <q-chip color="primary" text-color="white">
        Mes projets
    </q-chip>
    <ProjectList :projects="items" />
</template>

<script>

import ProjectList from 'src/components/ProjectList.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from 'src/components/SearchBar.vue';
import { useResource } from 'src/composables/resources';
import { useAuthStore } from 'src/stores/auth';

export default {
    components: {
        ProjectList,
        SearchBar
    },
    setup() {
        const auth = useAuthStore();
        const router = useRouter();
        const projects = useResource('project/user/' + auth.me.id);
        return {
            auth,
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
            this.projects.listWithoutAll().then((res) => {
                this.items = res.data
            })
        },
        projectsFilter(val) {
            console.log(val)
        },
        isSearch() {
            document.querySelector('input')
        }
    }
}

</script>
