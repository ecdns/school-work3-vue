<template>
    <q-header elevated>
        <q-toolbar>
            <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
            />
            <q-toolbar-title>
                CRM du Cube 3
            </q-toolbar-title>
            
            <div>
                <q-btn color="purple" label="Account Settings">
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
                                
                                <q-btn
                                color="primary"
                                label="Logout"
                                push
                                size="sm"
                                v-close-popup
                                />
                            </div>
                        </div>
                    </q-menu>
                </q-btn>
            </div>
        </q-toolbar>
    </q-header>
    <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    >
    <q-item-label
    header
    >
    Liens
</q-item-label>
    <q-list>
        <q-item
        clickable
        v-for="link in essentialLinks"
        :key="link.title"
        :to=link.link
        >
            <q-item-section
              v-if="link.icon"
              avatar
            >
              <q-icon :name="link.icon" />
            </q-item-section>
        
            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
              <q-item-label caption>{{ link.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </q-drawer>
</template>

<script>

import { ref } from 'vue';

const linksList = [
{
title: 'Accueil',
caption: 'quasar.dev',
icon: 'school',
link: '/'
},
{
title: 'Nouveau lien',
caption: 'Lien du CRM',
icon: 'favorite',
link: '/settings'
},
{
title: 'Mes messages',
caption: 'Messages',
icon: 'favorite',
link: '/messages'
},
]

export default {
    setup() {
        const leftDrawerOpen = ref(false);
        return {
            essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            }
        };
    },
}

</script>