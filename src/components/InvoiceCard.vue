<template>
    <q-card class="my-card q-pa-md q-mb-lg" flat bordered>
        <q-card-section>
            <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                    {{ invoice.name }}
                </div>
                <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                    {{ invoice.description }}
                </div>
            </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat color="primary" @click="router.push('/invoice/'+invoice.id)">
                Voir la facture
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  props: {
    invoice: Object,
  },
  setup() {
    const router = useRouter();

    return {
      router
    }
  },
};

</script>
