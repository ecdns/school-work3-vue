<template>
    <div class="q-pa-md q-mx-auto q-mt-xl" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md" ref="form" greedy>
            <q-input filled v-model="family.name" hint="Nom"></q-input>
            <q-input filled v-model="family.description" hint="Description"></q-input>
            <!-- <q-input filled v-model="family.company" hint="Entreprise"></q-input> -->
            <q-select filled v-model="family.company" use-chips label="Choisir une entreprise" :options="companiesList"
                style="width: 250px" option-label="name" option-value="id" lazy-rules :rules="[
                    (val) =>
                        (val !== null && val !== '') ||
                        'Veuillez sélectionner un statut',
                ]">
            </q-select>
            <div>
                <q-btn label="Modifier" type="reset" color="primary" flat class="q-ml-sm" @click="onSubmit"></q-btn>
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
        const productFamilies = useResource('productFamily')
        const route = useRoute()
        const companies = useResource('company')
        const q = useQuasar();

        return { route, productFamilies, companies, q }
    },
    data() {
        return {
            family: {},
            companiesList: []
        }
    },
    created() {
        this.reloadData();
    },
    methods: {
        reloadData() {
            this.productFamilies.get(this.route.params.id).then((res) => {
                this.family = res;
            })
            this.companies.list().then((res) => {
                res.data.forEach(element => {
                    this.companiesList.push(element);
                });
            })
        },
        onSubmit() {
            this.family.company = this.family.company.id
            this.productFamilies.update(this.family.id).then(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'positive',
                    message: 'La catégorie a bien été modifié'
                })
            }).catch(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'negative',
                    message: 'Erreur lors de la modification de la catégorie'
                })
            })
        }
    }
}

</script>