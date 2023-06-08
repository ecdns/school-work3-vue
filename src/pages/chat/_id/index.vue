<template>
    <q-page style="width: 50%;">
        <div class="flex column">
            <q-chip>
                <q-avatar>
                    {{ project.name[0] }}
                </q-avatar>
                {{ project.name }}
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

import { useResource } from 'src/composables/resources';
import Message from '../../../components/Message.vue';
import { useRoute } from 'vue-router';

export default {
    components: {
        Message
    },
    setup() {
        const route = useRoute();
        const projects = useResource('project')

        return { route }
    },
    data() {
        return {
            project: {}
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.projects.get(this.route.params.id).then((res) => {
                this.project = res.data
            })
        }
    }
}

</script>