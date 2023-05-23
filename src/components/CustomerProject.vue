<template>
  <div class="text-h6 q-mr-lg">Projet ({{ projects.length }})</div>
  <div v-if="(projects.length !== 0)">
    <ProjectCard v-for="(project, id) in projects" :project="project" v-bind:key="id" />
  </div>
  <div v-else>
    <div class="  flex flex-center">
      <q-icon size="10rem" name="block"></q-icon>
    </div>
    <div class="text-h4 q-my-md" style="text-align: center">Aucun projet n'est associé à ce client</div>
  </div>
</template>

<script>

import { useRouter } from 'vue-router';
import ProjectCard from './ProjectCard.vue';

export default {
  components: { ProjectCard },
  setup() {
    const router = useRouter()
    return { router }
  },

  data() {
    return {
      projects: [
        {
          id: 1,
          name: "Projet 1",
          createdAt: "2023-03-20",
          members: [
            {
              id: 1,
              name: "Clément",
              avatar: "https://cdn.quasar.dev/img/avatar5.jpg"
            },
            {
              id: 6,
              name: "Clément",
              avatar: "https://cdn.quasar.dev/img/avatar5.jpg"
            },
            {
              id: 7,
              name: "Clément",
              avatar: "https://cdn.quasar.dev/img/avatar5.jpg"
            },
            {
              id: 8,
              name: "Clément",
              avatar: "https://cdn.quasar.dev/img/avatar5.jpg"
            },
          ],
          description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic sed impedit ipsam in? Maiores quod quae, vitae voluptates similique facere tempora ipsam, fugiat magni voluptas, animi beatae voluptatibus quas. Mollitia?",
          statut: {
            label: "En cours",
            name: "inprogress",
            color: "teal"
          }
        },
        {
          id: 2,
          name: "Projet 2",
          createdAt: "2022-12-10",
          members: [
            {
              id: 2,
              name: "Macky",
              avatar: "https://cdn.quasar.dev/img/avatar5.jpg"
            },
            {
              id: 3,
              name: "Macky",
              avatar: "https://cdn.quasar.dev/img/avatar5.jpg"
            },
            {
              id: 4,
              name: "Macky",
              avatar: "https://cdn.quasar.dev/img/avatar5.jpg"
            },
            {
              id: 5,
              name: "Macky",
              avatar: "https://cdn.quasar.dev/img/avatar5.jpg"
            },
          ],
          description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic sed impedit ipsam in? Maiores quod quae, vitae voluptates similique facere tempora ipsam, fugiat magni voluptas, animi beatae voluptatibus quas. Mollitia?",
          statut: {
            label: "Abandonné",
            name: "stopped",
            color: "red"
          }
        },

      ]
    }
  }
}

</script>
