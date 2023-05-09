<template>
    <q-page style="width: 50%;">
        <q-tabs v-model="tab" class="text-teal">
            <q-tab label="Contact" name="contact" />
            <q-tab label="Projet" name="project" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="contact">
                <q-list>
                    <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple
                        @click="router.push(`/chat/${contact.conversation}`)">
                        <q-item-section avatar>
                            <q-avatar color="primary" text-color="white">
                                {{ contact.letter }}
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>{{ contact.name }}</q-item-label>
                            <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-icon name="chat_bubble" color="green" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-tab-panel>
            <q-tab-panel name="project">
                <q-list>
                    <q-item v-for="project in projects" :key="project.id" class="q-my-sm" clickable v-ripple
                        @click="router.push(`/chat/${project.id}`)">
                        <q-item-section avatar>
                            <q-avatar color="primary" text-color="white">
                                {{ project.id }}
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>{{ project.name }}</q-item-label>
                            <q-item-label caption lines="1">{{ project.createdAt }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-badge transparent :color="project.statut.color" :label="project.statut.name" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-tab-panel>
        </q-tab-panels>
    </q-page>
</template>

<script>

import { useRouter } from 'vue-router'
import { ref } from 'vue';


export default {
    setup() {
        const router = useRouter();

        return {
            router
        }
    },
    data() {
        return {
            contacts: [{
                id: 1,
                name: 'Ruddy Jedrzej',
                email: 'rjedrzej0@discuz.net',
                letter: 'R',
                conversation: 1
            }, {
                id: 2,
                name: 'Mallorie Alessandrini',
                email: 'malessandrini1@marketwatch.com',
                letter: 'M',
                conversation: 1
            }, {
                id: 3,
                name: 'Elisabetta Wicklen',
                email: 'ewicklen2@microsoft.com',
                letter: 'E',
                conversation: 1
            }, {
                id: 4,
                name: 'Seka Fawdrey',
                email: 'sfawdrey3@wired.com',
                letter: 'S',
                conversation: 1
            }],
            projects: [
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
                        name: "En cours",
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
                        name: "Abandonné",
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
                        name: "Terminé",
                        color: "red"
                    }
                },
            ],
            tab: ref('contact')
        }
    }
}
</script>