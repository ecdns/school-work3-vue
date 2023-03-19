<template>
    <q-page class="flex flex-center">
        <ProjectList :projects="items" />
    </q-page>
</template>

<script>

import ProjectList from 'src/components/ProjectList.vue';

export default {
    components: {
        ProjectList
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
                            name: "Clément"
                        },
                        {
                            id: 6,
                            name: "Clément"
                        },
                        {
                            id: 7,
                            name: "Clément"
                        },
                        {
                            id: 8,
                            name: "Clément"
                        },
                    ],
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic sed impedit ipsam in? Maiores quod quae, vitae voluptates similique facere tempora ipsam, fugiat magni voluptas, animi beatae voluptatibus quas. Mollitia?",
                    statut: {
                        name: "In Progress",
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
                        name: "Stopped",
                        color: "red"
                    }
                },
            ]
        }
    }
}

</script>