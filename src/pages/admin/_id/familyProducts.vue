<template>
    <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md" ref="form" greedy>
            <q-input filled v-model="user.firstName" hint="Prénom"></q-input>
            <q-input filled v-model="user.lastName" hint="Nom"></q-input>
            <q-input filled v-model="user.email" hint="Email"></q-input>
            <q-input filled v-model="user.job" hint="Job"></q-input>
            <q-input :disable="true" filled v-model="user.company" hint="Entreprise"></q-input>
            <q-input filled v-model="user.phone" hint="Téléphone"></q-input>
            <q-input filled v-model="user.role" hint="Role"></q-input>
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

export default {
    setup() {
        const users = useResource('user')
        const route = useRoute()
        const companies = useResource('company')
        const q = useQuasar();

        return { route, users, companies, q }
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
                this.user = res;
            })
        },
        onSubmit() {
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