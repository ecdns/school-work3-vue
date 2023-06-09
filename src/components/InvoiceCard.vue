<template>
    <q-card v-ripple class="my-card q-pa-md q-mb-lg" flat bordered>
        <q-card-section>
            <div class="column ">

                  <p class="text-h6">{{ invoice.name }}</p>
                  <p>{{ invoice.description }}</p>
            </div>
        </q-card-section>

        <q-separator />

      <q-card-actions class="justify-between">
        <div class="q-mr-md">
          <q-btn flat color="primary" @click="router.push('/invoice/'+invoice.id)">
            Voir la facture
          </q-btn>
        </div>
        <div>
          <q-btn color="primary" class="q-mr-lg" @click="showDialog = true">
            Modifier la facture
          </q-btn>

          <q-btn color="negative" @click="deleteInvoice">
            Supprimer la facture
          </q-btn>
        </div>
      </q-card-actions>

<!--      Dialog to edit invoice-->
      <q-dialog v-model="showDialog" transition-show="slide-down" transition-hide="slide-up"
                class="flex flex-center column">
        <q-card style="min-width: 60vw">
          <q-card-section>
            <q-form action="" method="post" @submit.prevent.stop="onSubmitInvoice">
              <InvoiceEdit ref="InvoiceEdit" :invoice="invoice" />
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

    </q-card>
</template>

<script>
import {useRouter} from "vue-router";
import InvoiceForm from "components/InvoiceForm.vue";
import InvoiceEdit from "components/InvoiceEdit.vue";
import {useResource} from "src/composables/resources";

export default {
  props: {
    invoice: Object,
  },
  components: {

    InvoiceEdit
  },
  setup() {
    const router = useRouter();
    const invoices = useResource("invoice");
    return {
      router,
      invoices
    }
  },
  data() {
    return {
      showDialog : false,
      postData: {}
    }
  },
  methods: {
    deleteInvoice() {
      const invoiceResource = useResource("invoice");
      invoiceResource.delete(this.invoice.id).then(() => {
        window.location.reload();
      });
    },
    onSubmitInvoice() {
      this.postData = {
        ... {
          name: this.$refs.InvoiceEdit.name,
          description: this.$refs.InvoiceEdit.description,
          project: this.invoice.project.id
        }
      }
      console.log(this.postData);
      this.invoices.update(this.invoice.id, JSON.stringify(this.postData)).then(res => {
        console.log(res);
        this.$refs.InvoiceEdit.products.forEach((product) => {

          const invoiceProducts = useResource("invoice/"+this.invoice.id+"/product/"+product.selectedValue+"/quantity/"+product.quantity)
          invoiceProducts.put().then((res) => {
            window.location.reload();
          })


        })

        this.q.notify({
          position: "top",
          type: "positive",
          message: `La facture a bien été mis à jour`,
          timeout: 3500
        })
      }).catch(() => {
        this.q.notify({
          position: "top",
          type: "negative",
          message: `Erreur lors de la modification de la facture`,
        });
      })
    },
  }
};

</script>

