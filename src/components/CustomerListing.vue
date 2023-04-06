<template>
  <q-page>
    <div class="icon_row">
      <p class="add_icon">
        <q-icon class="control_point_icon" name="control_point" size="30px" color="blue" />
      </p>


    </div>
    <div class="q-pa-md">
      <q-table flat bordered title="Clients" :rows="rows" :columns="columns" row-key="name"
        :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected" />

      <!-- <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div> -->
    </div>
  </q-page>
</template>


<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Nom',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'société', label: 'Société', field: 'Société', sortable: true },
  { name: 'rôle', label: 'Rôle', field: 'rôle' },

]

const rows = [
  {
    name: 'Frozen Yogurt',
    email: 'freddyyogurt@gmail.com',
    Société: 'Amazon',
    rôle: 'Manager',
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Froze Yogurt',
    email: 'freddyryogurt@gmail.com',
    Société: 'Amazon',
    rôle: 'Manager',

  },
  {
    name: 'Frozen Ygurt',
    email: 'freddyyogurt@gmail.com',
    Société: 'Amazon',
    rôle: 'Manager',
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Frozen Yogut',
    email: 'freddyyogurt@gmail.com',
    Société: 'Amazon',
    rôle: 'Manager',
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Frozen Yogur',
    email: 'freddyyogurt@gmail.com',
    Société: 'Amazon',
    rôle: 'Manager',
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Fozen Yogurt',
    email: 'freddyyogurt@gmail.com',
    Société: 'Amazon',
    rôle: 'Manager',
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Frozen Yogu',
    email: 'freddyyogurt@gmail.com',
    Société: 'Amazon',
    rôle: 'Manager',
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Frozen Yogurt',
    email: 'freddyyogurt@gmail.com',
    Société: 'Amazon',
    rôle: 'Manager',
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },

]

export default {
  setup() {
    const selected = ref([])

    return {
      selected,
      columns,
      rows,

      getSelectedString() {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
      }
    }
  }
}
</script>

<style lang="sass" >
.icon_row
  // border: 2px solid blue

  .add_icon
    // border: 2px solid blue
    position: absolute
    z-index: 1
    right: 30px
    top: 30px

    .control_point_icon




</style>
