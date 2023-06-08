<template>
    <div style="width: 100%;" v-if="messages.length > 0">
        <div v-for="message in messages" :key="message.id">
            <q-chat-message v-if="message.sender.id === auth.me.id" :name="[auth.me.firstName]"
                :avatar="[auth.me.firstName[0]]" :text="[message.message]" :stamp="[message.createdAt]" sent />
            <q-chat-message v-else :name="[message.sender.firstName]" :avatar="[message.sender.firstName[0]]"
                :text="[message.message]" :stamp="[message.createdAt]" />
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
                this.messages.forEach(element => {
                    console.log(element.message)
                });
                console.log(this.messages)
            })
        },
        stringToHexColor(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }

            let hexColor = "#";
            for (let j = 0; j < 3; j++) {
                let value = (hash >> (j * 8)) & 0xff;
                hexColor += ("00" + value.toString(16)).substr(-2);
            }

            return hexColor;
        }
    }
}

</script>