<template>
    <section class="flex flex-center fit gradient-custom-3 login-page">
        <div class="container q-py-xl fit">
            <div class="column flex-center no-wrap fit">
                <div class="row flex-center fit testme ">
                    <div class="col-12 col-md-8">
                        <div class="card shadow-2-strong" style="border-radius: 1rem">
                            <q-form @submit.prevent="userLogin" class="column q-gutter-lg card-body q-pa-lg">
                                <div v-if="errored" v-show="errored">
                                    <p style="color: red">{{ error }}</p>
                                </div>
                                <label for="input-1">
                                    Adresse email
                                    <q-input id="input-1" v-model="credentials.email" dense outlined trim />
                                </label>
                                <label for="input-2">
                                    Mot de passe
                                    <q-input id="input-2" class="input" type="password" outlined
                                        v-model="credentials.password" dense trim />
                                </label>

                                <div class="text-center">
                                    <q-btn class="btn btn-block fit q-pa-sm"
                                        style="background-color: #ed2144; border-radius: 20px 20px" type="submit">
                                        <span>Se connecter</span>
                                    </q-btn>
                                </div>

                                <q-separator />

                                <div class="text-center text-muted mt-1">
                                    Pas encore de compte ?
                                    <router-link to="/register" class="fw-bold text-body">
                                        Inscrivez-vous ici
                                    </router-link>
                                </div>
                            </q-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'

export default {
    setup() {
        const errored = ref(false);
        const error = ref("");
        const authStore = useAuthStore();

        //const rememberMe = ref(false);
        const router = useRouter();
        const route = useRoute();

        const credentials = ref({
            email: "",
            password: "",
        });

        const q = useQuasar()

        return {
            errored, error, authStore, router, route, credentials, q
        }
    },
    methods: {
        userLogin() {
            this.authStore
                .login(this.credentials.email, this.credentials.password)
                .then(() => {
                    window.location.reload();
                    $q.notify({
                        icon: 'done',
                        color: 'positive',
                        message: 'Connexion réussie'
                    })
                }).catch(() => {
                    this.error = "Identifiant ou mot de passe incorrect";
                })
        }
    }
}


</script>

<style lang="scss" scoped>
a {
    color: grey;
}

.btn {
    font-family: "Nunito", sans-serif;
    font-weight: bold;
    color: white;
    text-transform: none;
    font-size: 1.5em;
}

.container {
    max-width: 720px;
}

.vh-100 {
    background-color: #e8f5ff !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
}

.login-page .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
}

.center {
    text-align: center;
}

.social {
    gap: 15px;
    margin: 4px;
    padding: 15px;
    word-spacing: 24px;
    text-align: center;
    white-space: nowrap;
}
</style>
<style lang="scss">
@media(max-width: $breakpoint-xs-max) {
    .login-page .card {
        background-color: rgba(255, 255, 255, 0.8) !important;
        border: 0px !important;
    }

    .testme {
        width: auto;
        box-shadow: none;
        margin: auto;
    }
}

@media(max-width: 800px) {
    .testme {
        height: 80vh !important;
        width: 10%;
        margin: auto;
    }
}
</style>
