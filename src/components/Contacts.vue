<template>
    <q-page>
        <q-tabs v-model="tab" class="text-primary">
            <q-tab label="Mes projets" name="contact" />
        </q-tabs>
        <q-separator />
        <q-tab-panels class="full-width" v-model="tab" animated>
            <q-tab-panel name="contact">
                <q-list>
                    <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple
                        @click="router.push(`/chat/${contact.id}`)">
                        <q-item-section avatar>
                            <!-- <q-avatar v-for="user in contact.users" color="primary" text-color="white">
                                {{ user.name[0] }}
                            </q-avatar> -->
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>{{ contact.name }}</q-item-label>
                            <q-item-label caption lines="1">{{ contact.users.forEach(element => {
                                element.name
                            }) }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-icon name="chat_bubble" color="green" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-tab-panel>
        </q-tab-panels>
    </q-page>
</template>

<script>

import { useRouter } from 'vue-router'
import { ref } from 'vue';

export default {
    props: {
        contacts: Array
    },
    setup() {
        const router = useRouter();

        return {
            router
        }
    },
    data() {
        return {
            tab: ref('contact')
        }
    }
}
</script>