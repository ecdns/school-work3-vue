<template>
  <q-card class="my-card q-pa-md" flat bordered>
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

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        {{ invoice.invoiceProducts[0].product.quantity }} {{ invoice.invoiceProducts[0].product.name }}
      </div>
      <div class="text-caption text-grey">
        {{ invoice.invoiceProducts[0].product.supplier.name }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat color="primary" @click="openInvoiceDialog()">
        Exporter PDF
      </q-btn>
    </q-card-actions>
  </q-card>
  <InvoiceDialog @click="openInvoiceDialog()" @changeBool="setBool($event)" :invoice="invoice" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import InvoiceDialog from 'components/InvoiceDialog.vue';

export default {
  components: {
    InvoiceDialog
  },
  props: {
    invoice: Object,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    return { route, router }
  },
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    openInvoiceDialog() {
      this.isVisible = true;
      // console.log(this.visible)

    },
    setBool(event) {
      this.isVisible = event
      console.log("my event: ", event)
      console.log("isVisible: ", this.isVisible)
    }
  },


}

</script>
