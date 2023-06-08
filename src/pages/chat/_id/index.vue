<template>
    <q-page style="width: 50%;">
        <div class="flex column">
            <q-chip>
                {{ project.name }}
            </q-chip>
            <Message />
            <q-form>
                <q-input class="q-ma-lg" filled bottom-slots v-model="message.message" label="Label" :dense="dense">
                    <template v-slot:before>
                        <q-avatar>
                            {{ auth.me.firstName[0] + auth.me.lastName[0] }}
                        </q-avatar>
                    </template>

                    <template v-slot:after>
                        <q-btn round dense flat icon="send" @click="sendMessage" />
                    </template>
                </q-input>
            </q-form>
        </div>
    </q-page>
</template>

<script>

import { useResource } from 'src/composables/resources';
import Message from '../../../components/Message.vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';

export default {
    components: {
        Message
    },
    setup() {
        const route = useRoute();
        const projects = useResource('project')
        const auth = useAuthStore();
        const messages = useResource('message');
        const q = useQuasar();

        return { route, projects, auth, messages, q }
    },
    data() {
        return {
            project: {},
            message: {}
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.projects.get(this.route.params.id).then((res) => {
                this.project = res
                console.log(this.project)
            })
        },
        sendMessage() {
            this.message.sender = this.auth.me.id
            this.message.project = this.route.params.id
            this.messages.create(this.message).then(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'positive',
                    message: 'Message envoyé'
                })
                this.reloadData();
            }).catch(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'negative',
                    message: 'Erreur lors de l\'envoi du message'
                })
            })
        }
    }
}

</script>