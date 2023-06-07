<template>
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
                                        <img src="https://via.placeholder.com/150x50.png?text=Logo"
                                            style="width:100%; max-width:300px;">
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
                            {{ product.description }}
                        </td>

                        <td>
                            {{ product.sellPrice }}
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

export default {
    props: {
        invoice: Object,
    },
    data() {
        return {
            totalPrice: 0,
            visible: false
        }
    },
    methods: {
        getTotalPrice(products) {
            products.forEach(product => {
                this.totalPrice += product.sellPrice;
            });
            return this.totalPrice;
        }
    }
}

</script>