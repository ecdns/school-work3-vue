<template>
    <q-page>
        <q-input bottom-slots v-model="text" label="Rechercher un contact" :dense="dense">
            <template v-slot:before>
                <q-icon name="supervisor_account" />
            </template>

            <template v-slot:append>
                <q-icon name="search" />
            </template>
        </q-input>
        <div class="full-width row wrap justify-center items-center content-center">
            <Contacts />
            <router-view />
        </div>
    </q-page>
</template>

<script>
import Contacts from 'src/components/Contacts.vue';

export default {
    components: {
        Contacts,
    }
}

</script>