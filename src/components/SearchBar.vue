<template>
    <q-input v-model="search" debounce="1000" filled placeholder="Rechercher">
        <template v-slot:append>
            <q-icon name="search" />
        </template>
    </q-input>
    <ProjectList v-if="search.length && route.fullPath.includes('project')" :projects="filteredList()" />
    <Contacts v-if="search.length && route.fullPath.includes('chat')" :contacts="filteredList()" />
    <div class="item error " v-if="search.length && !filteredList().length">
        <p>Aucun résultat trouvé !</p>
    </div>
</template>

<script>

import { ref } from "vue";
import ProjectList from "./ProjectList.vue";
import { useRoute } from "vue-router";
import Contacts from "./Contacts.vue";

export default {
    components: {
        ProjectList,
        Contacts
    },
    props: {
        data: Array,
    },
    setup() {
        const route = useRoute();
        return { route }
    },
    data() {
        return {
            search: ref(''),
        }
    },
    methods: {
        filteredList() {
            return this.data.filter((a) =>
                a.name.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    }
}

</script>
