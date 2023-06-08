<template>
    <q-page>
        <div class="full-width row wrap justify-center items-center content-center">
            <div style="margin-top: 110px;">
                <SearchBar :data="contacts" />
                <Contacts :contacts="contacts" />
            </div>
        </div>
    </q-page>
</template>

<script>

import Contacts from 'src/components/Contacts.vue';
import SearchBar from 'src/components/SearchBar.vue';
import { useResource } from 'src/composables/resources';
import { Screen } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

export default {
    components: {
        Contacts,
        SearchBar
    },
    setup() {
        const auth = useAuthStore();
        const projects = useResource('project/user/' + auth.me.id);
        const router = useRouter();
        const screen = Screen;

        return { auth, projects, router, screen }
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
            this.projects.listWithoutAll().then((res) => {
                this.contacts = res.data;
                console.log(this.contacts)
            })
        }
    }
}

</script>