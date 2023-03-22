<template>
    <q-card class="my-card q-ma-lg" flat bordered @click="router.push(`/projects/${project.id}`)">
        <q-card-section horizontal>
            <q-card-section class="col-5 flex flex-center">
                <q-img style="height: 200px" class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
            </q-card-section>
            <q-card-section class="q-pt-xs">
                <q-badge floating transparent :color="project.statut.color" :label="project.statut.name" />
                <div class="text-h5 q-mt-sm q-mb-xs">{{ project.name }}</div>
                <div class="text-overline">Création : {{ project.createdAt }}</div>
                <div class="flex row">
                    <q-chip v-for="member in project.members" :key="member.id">
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                        </q-avatar>
                        {{ member.name }}
                    </q-chip>
                </div>
                <q-separator spaced class="q-mx-lg" />
                <div class="text-caption text-grey">{{ project.description }}</div>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<script>

import { useRouter } from 'vue-router';

export default {
    name: "project-card",
    props: {
        project: Object,
    },
    setup() {
        const router = useRouter()
        return { router }
    }
}

</script>