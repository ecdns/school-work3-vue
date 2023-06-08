<template>
    <div class="q-pa-md" style="max-width: 350px">
        <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>Panneau d'administration</q-toolbar-title>
        </q-toolbar>

        <q-item-label header>Utiliisateurs</q-item-label>

        <q-list bordered>
            <q-item v-for="user in usersList" :key="user.id" class="q-my-sm" clickable v-ripple
                @click="router.push(`admin/users/${user.id}`)">
                <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">
                        {{ user.firstName[0] }}
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ user.firstName + ' ' + user.lastName }}</q-item-label>
                    <q-item-label caption lines="1">{{ user.email }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-icon name="edit" color="blue" />
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script>

import { useRouter } from 'vue-router';
import { useResource } from 'src/composables/resources';

export default {
    setup() {
        const router = useRouter();
        const users = useResource("user")
        return {
            router,
            users
        }
    },
    data() {
        return {
            usersList: [],
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.users.list().then((res) => {
                res.data.forEach(element => {
                    this.usersList.push(element)
                });
            })
        }
    }
}
</script>