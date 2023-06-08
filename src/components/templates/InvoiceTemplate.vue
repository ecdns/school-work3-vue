<template>
  <div>
    <div class="invoice-box" id="facture">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td class="title">
                  <img src="https://via.placeholder.com/150x50.png?text=Logo" style="width:100%; max-width:300px;">
                </td>

                <td>
                  Numéro de facture : {{ invoiceData.id}}<br>
                  Date : {{ invoiceData.createdAt }}
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
                  <strong style="text-decoration: underline">Vendeur :</strong><br>
                  {{ invoiceData.project.company.name }}<br>
                  {{ invoiceData.project.company.address }}<br>
                  {{ invoiceData.project.company.zipCode }} {{ invoiceData.project.company.city }}<br>
                  {{ invoiceData.project.company.country }}
                </td>

                <td>
                  <strong style="text-decoration: underline">Acheteur</strong><br>
                  {{ invoiceData.project.customer.name }}<br>
                  {{ invoiceData.project.customer.address }}<br>
                  {{ invoiceData.project.customer.zipCode }} {{ invoiceData.project.customer.city }}<br>
                  {{ invoiceData.project.customer.country }}
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

        <tr class="item">
          <td>
            Produit 1
          </td>

          <td>
            10,00 €
          </td>
        </tr>

        <tr class="item">
          <td>
            Produit 2
          </td>

          <td>
            20,00 €
          </td>
        </tr>

        <tr class="item last">
          <td>
            Produit 3
          </td>

          <td>
            30,00 €
          </td>
        </tr>

        <tr class="total">
          <td></td>

          <td>
            Total: 60,00 €
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {useResource} from "src/composables/resources";

export default {
  data() {
    return {
      invoiceData: {},
      columns: [
        { name: 'Item', required: true, label: 'Item', align: 'left', field: 'item', sortable: true },
        { name: 'Quantity', required: true, label: 'Quantity', align: 'left', field: 'quantity', sortable: true },
        { name: 'Price', required: true, label: 'Price', align: 'left', field: 'price', sortable: true }
      ]
    };
  },
  mounted() {
    const invoiceId = this.$route.params.id; // Récupérer l'ID depuis l'URL
    console.log(invoiceId)
    this.getInvoiceData(invoiceId);
  },
  methods: {
    getInvoiceData(invoiceId) {
      const resourceInvoice = useResource('invoice');
      resourceInvoice.get(invoiceId)
        .then(response => {
          console.log(response);
          this.invoiceData = response;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.invoice {
  max-width: 400px;
  margin: 0 auto;
}

.items-table {
  margin-top: 20px;
}

.invoice-box {
  max-width: 850px;
  margin: auto;
  padding: 30px;
  margin-left: 100px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, .15);
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

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td{
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
