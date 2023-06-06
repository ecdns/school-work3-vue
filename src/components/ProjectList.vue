<template>
    <q-list style="width: -webkit-fill-available;">
        <ProjectCard v-for="(project, id) in projects" :project="project" v-bind:key="id" />
    </q-list>
</template>

<script>

import ProjectCard from './ProjectCard.vue';

export default {
    components: {
        ProjectCard
    },
    props: {
        projects: Array
    }
}

</script>