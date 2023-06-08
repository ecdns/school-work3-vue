<template>
    <UserAdminForm :user="user" />
</template>

<script>

import UserAdminForm from 'src/components/UserAdminForm.vue';
import { useResource } from 'src/composables/resources';
import { useRoute } from 'vue-router';

export default {
    components: {
        UserAdminForm
    },
    setup() {
        const users = useResource('user')
        const route = useRoute()

        return { route, users }
    },
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.users.get(this.route.params.id).then((res) => {
                this.user = res.company;
                console.log(this.user)
            })
        }
    }
}

</script>