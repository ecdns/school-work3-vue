<template>
    <div class="q-pa-md q-mx-auto q-mt-xl" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md" ref="form" greedy>
            <q-input filled v-model="user.firstName" hint="Prénom"></q-input>
            <q-input filled v-model="user.lastName" hint="Nom"></q-input>
            <q-input filled v-model="user.email" hint="Email"></q-input>
            <q-input filled v-model="user.job" hint="Job"></q-input>
            <q-input :disable="true" filled v-model="user.company" hint="Entreprise"></q-input>
            <q-input filled v-model="user.phone" hint="Téléphone"></q-input>
            <q-select filled v-model="user.role" use-chips label="Choisir un role" :options="rolesList" style="width: 250px"
                option-label="name" option-value="id" lazy-rules :rules="[
                    (val) =>
                        (val !== null && val !== '') ||
                        'Veuillez sélectionner un statut',
                ]">
            </q-select>
            <div>
                <q-btn label="Modifier l'utilisateur" type="reset" color="primary" flat class="q-ml-sm"
                    @click="onSubmit"></q-btn>
            </div>
        </q-form>
    </div>
</template>

<script>

import { useQuasar } from 'quasar';
import { useResource } from 'src/composables/resources';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

export default {
    setup() {
        const users = useResource('user')
        const route = useRoute()
        const companies = useResource('company')
        const roles = useResource('role');
        const q = useQuasar();
        const auth = useAuthStore();

        return { route, users, companies, roles, q, auth }
    },
    data() {
        return {
            user: {},
            rolesList: []
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.roles.list().then((res) => {
                res.data.forEach(element => {
                    this.rolesList.push(element);
                });
            })
            this.users.get(this.route.params.id).then((res) => {
                this.user = res;
            })
        },
        onSubmit() {
            this.user.role = this.user.role.id
            this.users.update(this.user.id).then(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'positive',
                    message: 'L\'utilisateur a bien été modifié'
                })
            }).catch(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'negative',
                    message: 'Erreur lors de la création de l\'utilisateur'
                })
            })
        }
    }
}

</script>
