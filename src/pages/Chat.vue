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

export default {
    components: {
        Contacts,
        SearchBar
    },
    data() {
        return {
            isSearch: false,
            contacts: [{
                id: 1,
                name: 'Ruddy Jedrzej',
                email: 'rjedrzej0@discuz.net',
                letter: 'R',
                conversation: 1
            }, {
                id: 2,
                name: 'Mallorie Alessandrini',
                email: 'malessandrini1@marketwatch.com',
                letter: 'M',
                conversation: 1
            }, {
                id: 3,
                name: 'Elisabetta Wicklen',
                email: 'ewicklen2@microsoft.com',
                letter: 'E',
                conversation: 1
            }, {
                id: 4,
                name: 'Seka Fawdrey',
                email: 'sfawdrey3@wired.com',
                letter: 'S',
                conversation: 1
            }],
        }
    },
    created() {
        console.log(this.isSearch)
    }
}

</script>