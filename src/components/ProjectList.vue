<template>
    <q-page>
        <q-list>
            <ProjectCard v-for="(project, id) in projects" :project="project" v-bind:key="id" />
        </q-list>
    </q-page>
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