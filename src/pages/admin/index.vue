<template>
    <div class="q-pa-md">
        <q-toolbar class="bg-primary text-white shadow-2 w-100">
            <q-toolbar-title>Panneau d'administration</q-toolbar-title>
        </q-toolbar>
        <q-btn @click="router.push('admin/users/create')">Ajouter un utilisateur</q-btn>
        <q-btn @click="router.push('admin/familyProducts/create')">Ajouter une famille de produits</q-btn>

        <q-item-label header>Utilisateurs</q-item-label>

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

        <q-item-label header>Familles de produit</q-item-label>

        <q-list bordered>
            <q-item v-for="family in productFamiliesList" :key="family.id" class="q-my-sm" clickable v-ripple
                @click="router.push(`admin/familyProducts/${family.id}`)">
                <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">
                        {{ family.name[0] }}
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{ family.name }}</q-item-label>
                    <q-item-label caption lines="1">{{ family.description }}</q-item-label>
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
        const productFamilies = useResource("productFamily")
        return {
            router,
            users,
            productFamilies
        }
    },
    data() {
        return {
            usersList: [],
            productFamiliesList: []
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
            this.productFamilies.list().then((res) => {
                this.productFamiliesList = res.data
                console.log(res)
            })
        }
    }
}
</script>