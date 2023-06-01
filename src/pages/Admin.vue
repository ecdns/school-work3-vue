<template>
    <div>
        <q-splitter v-model="splitterModel">

            <template v-slot:before>
                <div class="q-pa-md">
                    <q-tree :nodes="users" node-key="label" selected-color="primary" v-model:selected="selected"
                        default-expand-all />
                </div>
            </template>

            <template v-slot:after>
                <q-tab-panels v-model="selected" animated transition-prev="jump-up" transition-next="jump-up">
                    <q-tab-panel name="User 1">
                        <div class="flex flex-row justify-between text-h4 q-mb-md">
                            <p>Profil de User 1</p> <q-btn class="glossy" rounded color="deep-orange"
                                label="Supprimer l'utilsateur" @click="deleteUser(1)" />
                        </div>
                        <div class="q-pa-md" style="max-width: 400px">
                            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="form" greedy>
                                <q-input filled v-model="users[0].children[0].user.firstName" hint="Prénom"></q-input>
                                <q-input filled v-model="users[0].children[0].user.lastName" hint="Nom"></q-input>
                                <q-input filled v-model="users[0].children[0].user.email" hint="Email"></q-input>
                                <q-input filled v-model="users[0].children[0].user.job" hint="Job"></q-input>
                                <q-input filled v-model="users[0].children[0].user.company_id" hint="Entreprise"></q-input>
                                <q-input filled v-model="users[0].children[0].user.phone" hint="Téléphone"></q-input>
                                <q-input filled v-model="users[0].children[0].user.role_id" hint="Role"></q-input>
                                <div>
                                    <q-btn label="Modifier l'utilisateur" type="reset" color="primary" flat
                                        class="q-ml-sm"></q-btn>
                                </div>
                            </q-form>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </template>
        </q-splitter>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useResource } from 'src/composables/resources';

export default {
    setup() {
        const router = useRouter();
        const companies = useResource("company")
        return {
            router,
            companies
        }
    },
    created() {
        this.getUserCompany()
    },
    data() {
        return {
            splitterModel: ref(50),
            selected: ref('User 1'),
            users: [
                {
                    label: 'Gestion utilisateur',
                    children: [
                        {
                            label: 'User 1',
                            user: {
                                role_id: this.getUserRole(1),
                                company_id: 1,
                                firstName: "Dorian",
                                lastName: "Breuillard",
                                email: "dorian@gmail.com",
                                job: "Développeur",
                                phone: "0606486271",
                                isEnabled: 1
                            }
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        deleteUser(id) {
            console.log("delete")
        },
        getUserRole(role) {
            return role === 1 ? "Administrateur" : "Utilisateur";
        },
        getUserCompany() {
            this.companies.get(1).then((res) => {
                console.log(res)
            })
        }
    }
}
</script>