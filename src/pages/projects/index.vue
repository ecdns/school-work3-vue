<template>
    <div class="q-pa-md fit flex row justify-center">
        <q-input v-model="search" style="width: 80%;" label="Rechercher un projet" filled type="search">
            <template v-slot:append>
                <q-icon name="search" />
            </template>
        </q-input>
        <q-btn icon="add" color="primary" label="Nouveau projet" @click="router.push('/projects/create')" />
    </div>
    <div class="q-ma-md">
        <q-checkbox v-model="inprogress" label="En cours" color="teal" />
        <q-checkbox v-model="stopped" label="Abandonné" color="orange" />
        <q-checkbox v-model="ended" label="Terminé" color="red" />
    </div>
    <ProjectList :projects="items" />
    <q-pagination class="q-mb-md" v-model="current" :max="5" />
</template>

<script>

import ProjectList from 'src/components/ProjectList.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    components: {
        ProjectList
    },
    setup() {
        const router = useRouter()
        return {
            router,
            inprogress: ref(false),
            stopped: ref(false),
            ended: ref(false),
            current: 1
        }
    },
    data() {
        return {
            items: [
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
                {
                    id: 3,
                    name: "Projet 3",
                    createdAt: "2022-12-10",
                    members: [
                        {
                            id: 2,
                            name: "Macky"
                        },
                        {
                            id: 3,
                            name: "Macky"
                        },
                        {
                            id: 4,
                            name: "Macky"
                        },
                        {
                            id: 5,
                            name: "Macky"
                        },
                    ],
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic sed impedit ipsam in? Maiores quod quae, vitae voluptates similique facere tempora ipsam, fugiat magni voluptas, animi beatae voluptatibus quas. Mollitia?",
                    statut: {
                        label: "Terminé",
                        name: "ended",
                        color: "red"
                    }
                },
            ]
        }
    }
}

</script>