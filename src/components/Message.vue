<template>
    <div style="width: 100%;">
        <div v-for="message in messages" :key="message.id">
            <q-chat-message v-if="message.sender.id === auth.me.id" :name="[auth.me.firstName]"
                :avatar="auth.me.firstName[0]" :text="[message.message]" :stamp="message.createdAt" sent />
            <q-chat-message v-else :name="message.sender.firstName" :avatar="message.sender.firstName[0]"
                :text="message.message" :stamp="message.createdAt" />
        </div>
    </div>
</template>

<script>
import { useResource } from 'src/composables/resources';
import { useAuthStore } from 'src/stores/auth';
import { useRoute } from 'vue-router';


export default {
    setup() {
        const route = useRoute();
        const conversation = useResource('message/project/' + route.params.id)
        const auth = useAuthStore();

        return { conversation, route, auth }
    },
    data() {
        return {
            messages: []
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.conversation.listWithoutAll().then((res) => {
                this.messages = res.data
                console.log(this.messages)
            })
        }
    }
}

</script>