<template>
    <q-page style="width: 50%;">
        <div class="flex column">
            <q-chip>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                </q-avatar>
                John
            </q-chip>
            <Message />
            <q-input class="q-ma-lg" filled bottom-slots v-model="text" label="Label" :dense="dense">
                <template v-slot:before>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                    </q-avatar>
                </template>

                <template v-slot:after>
                    <q-btn round dense flat icon="send" />
                </template>
            </q-input>
        </div>
    </q-page>
</template>

<script>
import Message from './Message.vue';

export default {
    components: {
        Message
    }
}

</script>