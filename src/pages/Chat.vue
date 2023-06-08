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
import {useAuthStore} from "stores/auth";

export default {
    components: {
        Contacts,
        SearchBar
    },
    setup() {

      const auth = useAuthStore();
        return { auth }
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
          const projects = useResource('project/user/'+this.auth.me.id);
            projects.listWithoutAll().then((res) => {
                this.contacts = res.data;
                console.log(this.contacts)
            })
        }
    }
}

</script>
