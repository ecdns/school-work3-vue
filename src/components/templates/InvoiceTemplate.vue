<template>
  <div class="q-mt-xl">
    <div class="invoice-box" id="facture">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="5">
            <table>
              <tr>
                <td class="title">
                  <img src="https://via.placeholder.com/150x50.png?text=Logo" style="width:100%; max-width:300px;">
                </td>

                <td class="invoice-info">
                  <div>
                    <div class="info-label">Numéro de facture :</div>
                    <div class="info-value">{{ invoiceData.id }}</div>
                  </div>
                  <div>
                    <div class="info-label">Date :</div>
                    <div class="info-value">{{ invoiceData.createdAt }}</div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="information">
          <td colspan="5">
            <table>
              <tr>
                <td colspan="3">
                  <strong style="text-decoration: underline">Vendeur :</strong><br>
                  {{ invoiceCompany.name }}<br>
                  {{ invoiceCompany.address }}<br>
                  {{ invoiceCompany.zipCode }} {{ invoiceCompany.city }}<br>
                  {{ invoiceCompany.country }}
                </td>
                <td colspan="3">
                  <strong style="text-decoration: underline">Acheteur :</strong><br>
                  {{ invoiceCustomer.name }}<br>
                  {{ invoiceCustomer.address }}<br>
                  {{ invoiceCustomer.zipCode }} {{ invoiceCustomer.city }}<br>
                  {{ invoiceCustomer.country }}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="heading">
          <td>Libellé</td>
          <td>Quantité</td>
          <td>Type de Quantité</td>
          <td>Prix Unitaire</td>
          <td>Prix Total</td>
        </tr>

       <tr v-for="invoiceProduct in invoiceData.invoiceProducts" :key="invoiceProduct.id" class="item">
          <td>{{ invoiceProduct.product.name }}</td>
          <td>{{ invoiceProduct.quantity }}</td>
          <td>{{ invoiceProduct.product.quantityUnit.name }}</td>
          <td>{{ invoiceProduct.product.sellPrice }} €</td>
          <td>{{ (invoiceProduct.product.sellPrice * invoiceProduct.quantity ) }} €</td>
        </tr>



        <tr class="total">
          <td colspan="3"></td>
          <td>
            Total HT: {{ invoiceData.totalAmount }} €
          </td>
        </tr>
        <tr class="total">
          <td colspan="3"></td>
          <td>
            Total TTC: {{ invoiceData.totalAmountWithVat }} €
          </td>
        </tr>
      </table>
    </div>
    <div class="flex flex-center column">

      <q-btn @click="generatePDF"  label="Télécharger le PDF" class="q-mt-md" color="primary" />
      <q-btn @click="goback" label="Retour" class="q-mt-md" color="primary" />
    </div>

  </div>
</template>

<script>
import { useResource } from "src/composables/resources";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useQuasar } from "quasar";
import jsPDF from "jspdf";
import html2pdf from 'html2pdf.js';

export default {
  setup() {
    const invoice = useResource("invoice");
    const route = useRoute();
    const invoiceId = ref(route.params.id);
    const q = useQuasar();
    return {
      route,
      invoiceId,
      invoice,
      q,
    };
  },
  created() {
    this.reloadData();
  },
  data() {
    return {
      invoiceData: {},
      invoiceProject: {},
      invoiceCompany: {},
      invoiceCustomer: {},
    };
  },
  methods: {
    reloadData() {
      this.invoice.get(this.route.params.id).then((res) => {
        this.invoiceData = res;
        this.invoiceProject = res.project;
        this.invoiceCompany = res.project.company;
        this.invoiceCustomer = res.project.customer;
        console.log(this.invoiceData);
      });
    },
    async generatePDF() {
      const element = document.getElementById('facture');

      // Options de configuration pour html2pdf
      const options = {
        filename: 'facture.pdf',
        image: { type: 'pdf', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Générer le PDF avec html2pdf
      html2pdf().set(options).from(element).save();
    },
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.invoice-box {
  max-width: 850px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}
</style>
