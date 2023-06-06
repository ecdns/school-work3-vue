<template>
    <q-page>
        <div class="full-width row wrap justify-center items-center content-center">
            <div>
                <SearchBar :data="contacts" />
                <Contacts v-if="!isSearch" :contacts="contacts" />
            </div>
            <router-view />
        </div>
    </q-page>
</template>

<script>
import Contacts from 'src/components/Contacts.vue';
import SearchBar from 'src/components/SearchBar.vue';
import { useResource } from 'src/composables/resources';

export default {
    components: {
        Contacts,
        SearchBar
    },
    setup() {
        const projects = useResource('project');

        return { projects }
    },
    data() {
        return {
            isSearch: false,
            contacts: [],
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.projects.list().then((res) => {
                this.contacts = res.data;
                console.log(this.contacts)
            })
        }
    }
}

</script>