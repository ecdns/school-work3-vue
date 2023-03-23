<template>
    <q-page>
        <div class="flex column q-ma-xl">
            <Message />
            <q-input class="q-mt-lg" filled bottom-slots v-model="text" label="Label" counter maxlength="12" :dense="dense">
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

export default {
    components: {
        Message
    }
}

</script>