<template>
    <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md" ref="form" greedy>
            <q-input filled v-model="family.name" hint="Nom"></q-input>
            <q-input filled v-model="family.description" hint="Description"></q-input>
            <q-input filled v-model="family.company" hint="Entreprise"></q-input>
            <div>
                <q-btn label="Créer" type="reset" color="primary" flat class="q-ml-sm" @click="onSubmit"></q-btn>
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
            family: {}
        }
    },
    methods: {
        onSubmit() {
            this.productFamilies.create(this.family).then(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'positive',
                    message: 'La catégorie a bien été créée'
                })
            }).catch(() => {
                this.q.notify({
                    icon: 'done',
                    color: 'negative',
                    message: 'Erreur lors de la création de la catégorie'
                })
            })
        }
    }
}

</script>