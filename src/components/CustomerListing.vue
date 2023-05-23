<template>
  <q-page>

    <div class="q-pa-md">
      <q-table flat bordered title="Clients" :rows="customers" :columns="columns" row-key="email"
        :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected"
        @row-click="handleRowClick" />

      <!-- <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div> -->
    </div>
  </q-page>
</template>


<script>
import { ref } from 'vue'
import useQuasar from 'quasar/src/composables/use-quasar.js'
import { useRouter } from 'vue-router';


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
  { name: 'customerCompanyName', label: 'Société', field: 'customerCompanyName', sortable: true },
  { name: 'post', label: 'Rôle', field: 'post' },

]

// let customers = ref([
//   {
//     id: 1,
//     name: 'Frozen Yogurt',
//     email: 'freddyyogurt@gmail.com',
//     customerCompanyName: 'Amazon',
//     post: 'Manager',

//   },
//   {
//     id: 2,
//     name: 'Froze Yogurt',
//     email: 'freddyryogurt@gmail.com',
//     customerCompanyName: 'Amazon',
//     post: 'Manager',

//   },


// ])



export default {
  props: {
    customers: ref(Array),
  },

  setup() {
    const router = useRouter()

    const $q = useQuasar()
    const selected = ref([])

    const lastName = ref(null)
    const lastNameRef = ref(null)

    const firstName = ref(null)
    const firstNameRef = ref(null)

    const email = ref(null)
    const emailRef = ref(null)

    const address = ref(null)
    const addressRef = ref(null)

    const city = ref(null)
    const cityRef = ref(null)

    const zipCode = ref(null)
    const zipCodeRef = ref(null)

    const phone = ref(null)
    const phoneRef = ref(null)

    const customerCompanyName = ref(null)
    const customerCompanyNameRef = ref(null)

    const post = ref(null)
    const postRef = ref(null)


    return {

      dialogVisible: ref(false),
      router,

      selected,
      columns,
      // customers,

      lastName,
      lastNameRef,

      firstName,
      firstNameRef,
      email,
      emailRef,

      address,
      addressRef,

      city,
      cityRef,

      zipCode,
      zipCodeRef,

      phone,
      phoneRef,

      customerCompanyName,
      customerCompanyNameRef,

      post,
      postRef,



      onSubmit() {
        firstNameRef.value.validate()


        if (firstNameRef.value.hasError) {
          // form has error
        }

        else {
          // console.log(customers)
          customers.value.unshift(
            {
              name: lastName.value + ' ' + firstName.value,
              email: email.value,
              customerCompanyName: customerCompanyName.value,
              post: post.value,
              address: address.value,
              city: city.value,
              zipCode: zipCode.value,
              phone: phone.value

            }
          )
          console.log(customers.value)

          // $q.notify({
          //   icon: 'done',
          //   color: 'positive',
          //   message: 'Submitted'
          // })

        }
      },

      handleRowClick(_, row) {

        router.push(`/customers/${row.id}`)
      },


      getSelectedString() {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
      },


    }
  },
  components: {}
}
</script>

<style lang="sass" >
.add_customer_button
  position: absolute
  z-index: 1
  right: 30px
  top: 70px
  cursor:  pointer


.flex-input
  display: flex

.submit_button
  width:100px
  margin:20px auto
  display: block


</style>
