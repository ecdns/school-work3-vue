<template>
    <q-list style="width: -webkit-fill-available;">
        <InvoiceCard v-for="(invoice, id) in invoices" :invoice="invoice" v-bind:key="id" />
    </q-list>
</template>
<script>

import InvoiceCard from './InvoiceCard.vue';

export default {
    components: {
        InvoiceCard
    },
    props: {
        invoices: Array
    }
}

</script>