<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title>
        {{ company }}
      </q-toolbar-title>

      <q-btn icon="settings" color="#244F7D">
        <q-menu fit>
          <div class="row no-wrap q-pa-md">
            <!--            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-toggle v-model="mobileData" label="Use Mobile Data" />
              <q-toggle v-model="bluetooth" label="Bluetooth" />
            </div>-->

            <!--            <q-separator vertical inset class="q-mx-lg" />-->

            <div class="column items-center">
              <q-avatar :style="{ 'background-color': colorBackground }" text-color="white" size="60px">{{
                auth.me.firstName.substring(0, 1) }}{{ auth.me.lastName.substring(0, 1) }}</q-avatar>

              <div style="width: 150px;" class="text-subtitle1 q-mt-md q-mb-xs text-center">{{ auth.me.firstName }} {{
                auth.me.lastName }}</div>

              <q-btn @click="auth.logout()" color="primary" label="Logout" push size="sm" v-close-popup />
            </div>
          </div>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>

  <q-drawer v-model="drawer" show-if-above :mini="isMiniState()" @mouseover="miniState = false"
    @mouseout="miniState = true" :width="300" :breakpoint="10" bordered class="bg-grey-3"
    content-class="column justify-between no-wrap">
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <q-list>
        <q-item clickable style="width: 100%;">
          <q-item-section avatar>
            <q-avatar :style="{ 'background-color': colorBackground }" text-color="white" size="45px">{{
              auth.me.firstName.substring(0, 1) }}{{ auth.me.lastName.substring(0, 1) }}</q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label style="font-weight: bold;" class="text-h6">{{ auth.me.firstName }} {{ auth.me.lastName
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator black />
        <q-item clickable v-for="link in essentialLinks" :key="link.title" :to="link.link">
          <q-item-section v-if="link.icon" avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="font-weight: bold">{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="absolute-bottom">
        <!--       Afficher une image différente entre le menu déplié et réctracté           -->
        <q-item clickable>
          <q-item-section avatar>
            <!--            image 1 -->
            <q-avatar size="50px">
              <img src="/src/assets/comunicaLogo.png">
            </q-avatar>

          </q-item-section>
          <q-item-section>
            <!--            Image 2-->
            <q-img src="/src/assets/comunicaTexte.png" size="50px">
              <img src="">
            </q-img>
          </q-item-section>
        </q-item>

      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { Screen } from 'quasar';
import { useResource } from "src/composables/resources";

export default {
  setup() {
    const auth = useAuthStore();
    const drawer = ref(false);
    const miniState = ref(true);
    const essentialLinks = [
      {
        title: 'Tableau de bord',
        icon: 'dashboard',
        link: '/',
      },
      {
        title: 'Projets',
        icon: 'view_list',
        link: '/projects',
      },
      {
        title: 'Chat',
        icon: 'question_answer',
        link: '/chat',
      },
      {
        title: 'Produits / Services',
        icon: 'receipt',
        link: '/products',
      },
      {
        title: 'Clients',
        icon: 'contact_page',
        link: '/customers',
      },

    ];

    function stringToHexColor(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      let hexColor = "#";
      for (let j = 0; j < 3; j++) {
        let value = (hash >> (j * 8)) & 0xff;
        hexColor += ("00" + value.toString(16)).substr(-2);
      }

      return hexColor;
    }

    const colorBackground = stringToHexColor(auth.me.firstName + auth.me.lastName);


    const company = ref("Chargement...");

    onMounted(async () => {
      if (auth.me.role === 'Administrateur') {
        essentialLinks.push({
          title: 'Administration',
          icon: 'lock',
          link: '/admin',
        }
        );
      }
      try {
        const companyResource = useResource('company');
        const data = await companyResource.get(auth.me.company);
        company.value = data.name;
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la société:', error);
      }
    });

    function isMiniState() {
      switch (Screen.name) {
        case 'xs':
          return true;
        case 'sm':
          return true;
        case 'md':
        case 'lg':
        case 'xl':
          return miniState.value;
      }
    }

    return {
      auth,
      drawer,
      miniState,
      essentialLinks,
      isMiniState,
      company,
      colorBackground,
    };
  },
};
</script>

<style></style>
