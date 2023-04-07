<template>
  <q-page>
    <div class="q-pa-md">
      <div class="add_customer_button">
        <q-btn push outline rounded color="primary" icon="add" label="NOUVEAU CLIENT">
          <q-popup-proxy>
            <q-banner>
              <template v-slot:avatar>
                <q-form action="" method="post" @submit.prevent.stop="onSubmit">
                  <div class="flex-input">
                    <q-input outlined v-model="lastName" name="lastName" ref="firstNameRef" label="Nom"
                      class="q-mx-lg q-my-sm" />
                    <q-input outlined v-model="firstName" name="firstName" ref="firstNameRef" label="Prénom"
                      class="q-mx-lg q-my-sm" />
                  </div>
                  <div class="flex-input">
                    <q-input outlined v-model="customerCompanyName" name="customerCompanyName"
                      ref="customerCompanyNameRef" label="Société" class="q-mx-lg q-my-sm" />
                    <q-input outlined v-model="post" name="post" ref="postRef" label="Rôle" class="q-mx-lg q-my-sm" />
                  </div>
                  <div class="flex-input">
                    <q-input outlined v-model="phone" name="phone" ref="phoneRef" label="Téléphone"
                      class="q-mx-lg q-my-sm" />
                    <q-input outlined v-model="email" name="email" ref="emailRef" label="Email" class="q-mx-lg q-my-sm" />
                  </div>
                  <div class="flex-input">
                    <q-input outlined v-model="address" name="address" ref="addressRef" label="Adresse"
                      class="q-mx-lg q-my-sm" />
                    <q-input outlined v-model="country" name="country" ref="countryRef" label="Pays"
                      class="q-mx-lg q-my-sm" />
                  </div>
                  <div class="flex-input">
                    <q-input outlined v-model="zipCode" name="zipCode" ref="zipCodeRef" label="Code Postal"
                      class="q-mx-lg q-my-sm" />
                    <q-input outlined v-model="city" name="city" ref="cityRef" label="Ville" class="q-mx-lg q-my-sm" />
                  </div>


                  <div class="div_submit_button">
                    <q-btn class="submit_button" outlined ripple label="Valider" type="submit" color="primary" />

                  </div>
                </q-form>

              </template>
            </q-banner>
          </q-popup-proxy>
        </q-btn>
      </div>

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
import useQuasar from 'quasar/src/composables/use-quasar.js'

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

let rows = ref([
  {
    name: 'Frozen Yogurt',
    email: 'freddyyogurt@gmail.com',
    customerCompanyName: 'Amazon',
    post: 'Manager',

  },
  {
    name: 'Froze Yogurt',
    email: 'freddyryogurt@gmail.com',
    customerCompanyName: 'Amazon',
    post: 'Manager',

  },


])

export default {

  setup() {
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
      selected,
      columns,
      rows,

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
          // console.log(rows)
          rows.value.unshift(
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
          console.log(rows.value)

          // $q.notify({
          //   icon: 'done',
          //   color: 'positive',
          //   message: 'Submitted'
          // })

        }
      },




      getSelectedString() {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
      }
    }
  }
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
