<template>
    <div class="q-pa-md q-mx-auto q-mt-xl" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md" ref="form" greedy>
            <q-input filled v-model="user.firstName" label="Prénom"></q-input>
            <q-input filled v-model="user.lastName" label="Nom"></q-input>
            <q-input filled v-model="user.email" label="Email"></q-input>
            <q-input filled v-model="user.password" label="Mot de passe"></q-input>
            <q-input filled v-model="user.job" label="Job"></q-input>
            <q-input :disable="true" filled v-model="user.company" label="Entreprise"></q-input>
            <q-input filled v-model="user.phone" label="Téléphone"></q-input>
            <q-select filled v-model="user.role" use-chips label="Choisir un role" :options="rolesList" option-label="name"
                option-value="id" lazy-rules :rules="[
                    (val) =>
                        (val !== null && val !== '') ||
                        'Veuillez sélectionner un role',
                ]">
            </q-select>
            <div class="flex flex-center column">
                <q-btn label="Créer l'utilisateur" type="reset" color="primary" flat class="q-ma-sm"
                    @click="onSubmit"></q-btn>
                <q-btn @click="goback" label="Retour" color="primary" class="q-ma-sm" />
            </div>
        </q-form>
    </div>
</template>

<script>

import { useQuasar } from 'quasar';
import { useResource } from 'src/composables/resources';
import { useAuthStore } from 'src/stores/auth';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const users = useResource('user')
        const roles = useResource('role')
        const route = useRoute()
        const companies = useResource('company')
        const q = useQuasar();
        const auth = useAuthStore();

        return { route, users, roles, companies, q, auth }
    },
    data() {
        return {
            user: {},
            rolesList: [],
            companiesList: []
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.roles.list().then((res) => {
                this.rolesList = res.data
            })
            this.user.company = this.auth.me.company
        },
        onSubmit() {
            this.user.role = this.user.role.id
            this.users.create(this.user).then(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'positive',
                    message: 'L\'utilisateur a bien été créé'
                })
                window.location.reload()
            }).catch(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'negative',
                    message: 'Erreur lors de la création de l\'utilisateur'
                })
            })
        },
        goback() {
            this.$router.go(-1);
        },
    }
}

</script>
