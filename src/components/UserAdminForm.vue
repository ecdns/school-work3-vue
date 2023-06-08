<template>
    <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md" ref="form" greedy>
            <!-- <q-input filled v-model="user.firstName" hint="Prénom"></q-input>
            <q-input filled v-model="user.lastName" hint="Nom"></q-input>
            <q-input filled v-model="user.email" hint="Email"></q-input>
            <q-input filled v-model="user.job" hint="Job"></q-input>
            <q-input filled v-model="user.company_id" hint="Entreprise"></q-input>
            <q-input filled v-model="user.phone" hint="Téléphone"></q-input>
            <q-input filled v-model="user.role_id" hint="Role"></q-input> -->
            <div>
                <q-btn label="Modifier l'utilisateur" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
            </div>
        </q-form>
    </div>
</template>

<script>
import { useResource } from 'src/composables/resources';

export default {
    props: { user: Object },
    setup() {
        const companies = useResource("company");
        const users = useResource("user");
        return {
            companies,
            users
        }
    },
    created() {
        console.log(this.user)
    },
    methods: {
        onSubmit() {
            this.users.update(this.user).then(() => {
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