<template>
  <div class="text-h6 q-mr-lg">Projet ({{ items.length }})</div>
  <div v-if="(projects.length !== 0)">
    <ProjectCard v-for="(project, id) in items" :project="project" v-bind:key="id" />
  </div>
  <div v-else>
    <div class="  flex flex-center">
      <q-icon size="10rem" name="block"></q-icon>
    </div>
    <div class="text-h4 q-my-md" style="text-align: center">Aucun projet n'est associé à ce client</div>
  </div>
</template>

<script>
import { useResource } from 'src/composables/resources';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import ProjectCard from './ProjectCard.vue';
import { ref } from 'vue';


export default {
  components: { ProjectCard },
  setup() {
    const router = useRouter()
    const route = useRoute();
    const customerId = ref(route.params.id);
    return { router, route, customerId }
  },

  data() {
    return {
      projects: useResource('project/customer'),
      items: [
        {
          "id": 28,
          "name": "Amandanas - Construction",
          "description": "Le projet conciste à construire le batiment pour Amandanas",
          "createdAt": "2023-06-07 13:02:42",
          "updatedAt": "2023-06-07 13:02:42",
          "company": {
            "id": 22,
            "name": "Aubade",
            "address": "rue de la paix",
            "city": "Paris",
            "country": "France",
            "zipCode": "75000",
            "phone": "0145879652",
            "slogan": "La vie est belle",
            "logoPath": "logo.png",
            "license": {
              "id": 22,
              "name": "premium",
              "description": "Une licence premium",
              "price": 100,
              "maxUsers": 10,
              "validityPeriod": 365,
              "createdAt": "2023-06-07 13:02:41",
              "updatedAt": null
            },
            "licenseExpirationDate": {
              "date": "2021-12-31 00:00:00.000000",
              "timezone_type": 3,
              "timezone": "Europe/Paris"
            },
            "language": "fr",
            "created_at": {
              "date": "2023-06-07 13:02:41.000000",
              "timezone_type": 3,
              "timezone": "Europe/Paris"
            },
            "updated_at": null,
            "isEnabled": true
          },
          "creator": {
            "id": 36,
            "firstName": "Dorian",
            "lastName": "Breuillard",
            "email": "dorian.breuillard@gmail.com",
            "role": "Administrateur",
            "job": "Développeur",
            "phone": "0606060606",
            "company": 22,
            "createdAt": "2023-06-07 13:02:42",
            "updatedAt": "2023-06-07 15:42:01",
            "passwordConfirmedAt": null,
            "isEnabled": true,
            "userSettings": null
          },
          "customer": {
            "id": 27,
            "name": "La company Canadienne de Jean",
            "firstName": "Jean",
            "lastName": "Dupont",
            "email": "jean.dupont@wanadoo.fr",
            "job": "PDG",
            "address": "1 rue de la paix",
            "city": "Paris",
            "country": "France",
            "zipCode": "75000",
            "phone": "0606060606",
            "createdAt": {
              "date": "2023-06-07 13:02:42.000000",
              "timezone_type": 3,
              "timezone": "Europe/Paris"
            },
            "updatedAt": {
              "date": "2023-06-07 15:18:17.000000",
              "timezone_type": 3,
              "timezone": "Europe/Paris"
            },
            "company": 22,
            "status": {
              "id": 23,
              "name": "Client",
              "description": "Client",
              "createdAt": "2023-06-07 13:02:41",
              "updatedAt": null
            },
            "projects": [
              28,
              29,
              30
            ]
          },
          "users": [
            {
              "id": 36,
              "firstName": "Dorian",
              "lastName": "Breuillard",
              "email": "dorian.breuillard@gmail.com",
              "role": "Administrateur",
              "job": "Développeur",
              "phone": "0606060606",
              "company": 22,
              "createdAt": "2023-06-07 13:02:42",
              "updatedAt": "2023-06-07 15:42:01",
              "passwordConfirmedAt": null,
              "isEnabled": true,
              "userSettings": null
            },
            {
              "id": 40,
              "firstName": "Clément",
              "lastName": "Pavot",
              "email": "clement@getinov.com",
              "role": "Administrateur",
              "job": "Développeur",
              "phone": "0606060606",
              "company": 22,
              "createdAt": "2023-06-07 13:02:42",
              "updatedAt": "2023-06-07 15:03:45",
              "passwordConfirmedAt": null,
              "isEnabled": true,
              "userSettings": null
            }
          ],
          "projectStatus": {
            "id": 36,
            "name": "Terminé",
            "description": "Le projet est terminé",
            "createdAt": "2023-06-07 13:02:41",
            "updatedAt": null
          }
        },

      ]
    }
  },

  methods: {
    getProjects() {
      this.projects.get(this.customerId).then((res) => {
        // console.log(res[0])
        res.forEach(element => {
          this.items.push(element)
        });
      })
    }
  },
  created() {
    this.getProjects();
  }
}

</script>
