<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <div class="q-pa-md">
                <q-toolbar class="bg-primary text-white q-my-md shadow-2">
                    <q-btn-dropdown stretch flat label="Dropdown">
                        <q-list>
                            <q-item-label header>Folders</q-item-label>
                            <q-item v-for="n in 3" :key="`x.${n}`" clickable v-close-popup tabindex="0">
                                <q-item-section avatar>
                                    <q-avatar icon="folder" color="secondary" text-color="white" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Photos</q-item-label>
                                    <q-item-label caption>February 22, 2016</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-icon name="info" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                    <q-space />
                    <q-separator dark vertical />
                    <q-btn stretch flat label="Nouveau" />
                    <q-separator dark vertical />
                    <q-btn stretch flat label="Supprimer" />
                </q-toolbar>
            </div>
            <div class="full-width row wrap justify-center items-center content-center">
                <SlideConversation />
                <div class="flex column q-ma-xl">
                    <Message />
                    <q-input class="q-mt-lg" filled bottom-slots v-model="text" label="Label" counter maxlength="12"
                        :dense="dense">
                        <template v-slot:before>
                            <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                            </q-avatar>
                        </template>

                        <template v-slot:append>
                            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
                            <q-icon name="schedule" />
                        </template>

                        <template v-slot:hint>
                            Field hint
                        </template>

                        <template v-slot:after>
                            <q-btn round dense flat icon="send" />
                        </template>
                    </q-input>
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
import SlideConversation from 'src/components/SlideConversation.vue';
import Message from 'src/components/Message.vue';

export default {
    components: {
        SlideConversation,
        Message
    }
}

</script>