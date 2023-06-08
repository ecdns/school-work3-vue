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
      <q-btn flat color="primary" @click="openInvoiceDialog">
        Exporter PDF
      </q-btn>
    </q-card-actions>
  </q-card>
  <q-dialog v-model="visible" persistent transition-show="slide-up" transition-hide="slide-down">
    <q-card class="bg-primary text-white flex column">
      <q-bar>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="invoice-box flex column items-center" id="facture">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <img src="https://via.placeholder.com/150x50.png?text=Logo" style="width:100%; max-width:300px;">
                  </td>

                  <td>
                    Numéro de facture : {{ invoice.id }}<br>
                    Date : {{ invoice.createdAt }}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    Vendeur<br>
                    {{ invoice.invoiceProducts[0].product.company.name }}<br>
                    {{ invoice.invoiceProducts[0].product.company.address }}<br>
                    {{ invoice.invoiceProducts[0].product.company.zipCode }}<br>
                    {{ invoice.invoiceProducts[0].product.company.country }}<br>
                  </td>

                  <td>
                    Acheteur<br>
                    {{ invoice.invoiceProducts[0].product.supplier.name }}<br>
                    {{ invoice.invoiceProducts[0].product.supplier.address }}<br>
                    {{ invoice.invoiceProducts[0].product.supplier.zipCode }}<br>
                    {{ invoice.invoiceProducts[0].product.supplier.country }}<br>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="heading">
            <td>
              Description
            </td>

            <td>
              Prix
            </td>
          </tr>
          <tr v-for="product in invoice.invoiceProducts" v-bind:key="product.id" class="item">
            <td>
              {{ product.product.description }}
            </td>

            <td>
              {{ product.product.sellPrice }}
            </td>
          </tr>

          <tr class="total">
            <td></td>

            <td>
              Total: {{ getTotalPrice(invoice.invoiceProducts) }}
            </td>
          </tr>
        </table>
      </div>
      <q-btn @click="exportPDF()">Télécharger la facture</q-btn>
    </q-card>
  </q-dialog>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
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
      visible: false,
      totalPrice: 0,
    }
  },
  methods: {
    openInvoiceDialog() {
      this.visible = true;
    },
    getTotalPrice(products) {
      products.forEach(product => {
        this.totalPrice += product.product.sellPrice;
        console.log(this.totalPrice)
      });
      return this.totalPrice;
    },
    exportPDF() {
      const element = document.getElementById("facture");

      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("Facture numéro " + this.invoice.id);
      });
    }
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
