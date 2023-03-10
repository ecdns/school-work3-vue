<template>
    <q-header elevated>
        <q-toolbar>
            <q-toolbar-title>
                CRM du Cube 3
            </q-toolbar-title>

            <div>
                <q-btn icon="settings" color="black">
                    <q-menu>
                        <div class="row no-wrap q-pa-md">
                            <div class="column">
                                <div class="text-h6 q-mb-md">Settings</div>
                                <q-toggle v-model="mobileData" label="Use Mobile Data" />
                                <q-toggle v-model="bluetooth" label="Bluetooth" />
                            </div>

                            <q-separator vertical inset class="q-mx-lg" />

                            <div class="column items-center">
                                <q-avatar size="72px">
                                    <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                                </q-avatar>

                                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                                <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
                            </div>
                        </div>
                    </q-menu>
                </q-btn>
            </div>
        </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true"
        :width="300" :breakpoint="500" bordered class="bg-grey-3">
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
            <q-list>
                <q-item clickable style="width: 100%;">
                    <q-item-section avatar>
                        <q-avatar size="50px">
                            <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Antoine Dupont</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator black />
                <q-item clickable v-for="link in essentialLinks" :key="link.title" :to=link.link>
                    <q-item-section v-if="link.icon" avatar>
                        <q-icon :name="link.icon" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>{{ link.title }}</q-item-label>
                        <q-item-label caption>{{ link.caption }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<script>

import { ref } from 'vue';

const linksList = [
    {
        title: 'Tableau de bord',
        icon: 'school',
        link: '/'
    },
    {
        title: 'Projets',
        icon: 'thumb_up',
        link: '/projects'
    },
    {
        title: 'Chat',
        icon: 'favorite',
        link: '/chat'
    },
    {
        title: 'Produits / Services',
        icon: 'favorite',
        link: '/products'
    },
    {
        title: 'Clients',
        icon: 'favorite',
        link: '/customers'
    },
    {
        title: 'Administration',
        icon: 'favorite',
        link: '/admin'
    },
]

export default {
    setup() {
        return {
            essentialLinks: linksList,
            drawer: ref(false),
            miniState: ref(true)
        };
    },
}

</script>

<style></style>