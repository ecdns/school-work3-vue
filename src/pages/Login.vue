<template>
    <section class="flex flex-center fit gradient-custom-3 login-page">
        <div class="container q-py-xl fit">
            <div class="column flex-center no-wrap fit">
                <div class="row flex-center fit testme ">
                    <div class="col-12 col-md-8">
                        <div class="card shadow-2-strong" style="border-radius: 1rem">
                            <div v-if="showEnabledAccount">
                                <div class="text-center">
                                    <img alt="logo" src="/img/Logo_Walking_Dog.png" height="150" />
                                </div>
                                <q-banner class="bg-positive text-white q-ma-md">
                                    Votre compte a bien été validé, vous pouvez maintenant vous connecter sur l'application.
                                </q-banner>
                            </div>
                            <q-form @submit.prevent="userLogin" class="column q-gutter-lg card-body q-pa-lg"
                                v-if="!showEnabledAccount">
                                <div class="text-center">
                                    <router-link to="/" style="white-space: nowrap">
                                        <img alt="logo" src="/img/Logo_Walking_Dog.png" height="150" />
                                    </router-link>
                                </div>
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

                                <!-- Checkbox -->
                                <div class="container mt-3 mb-3">
                                    <div class="row items-center">
                                        <div>
                                            <div style="white-space: nowrap">
                                                <!--q-checkbox
                                                    id="checkbox-1"
                                                    name="checkbox-1"
                                                    v-model="rememberMe"
                                                    >
                                                    Se souvenir de moi
                                                </q-checkbox-->
                                            </div>
                                        </div>
                                        <q-space />
                                        <div>
                                            <span class="text-center fw-bold">
                                                <router-link to="/send-reset-password" style="white-space: nowrap">
                                                    Mot de passe oublié ?
                                                </router-link>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="text-center">
                                    <q-btn class="btn btn-block fit q-pa-sm"
                                        style="background-color: #ed2144; border-radius: 20px 20px" type="submit">
                                        <q-spinner v-if="spinner" variant="light" />
                                        <span v-show="!spinner">Se connecter</span>
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
import { useResource } from "../composables/resources";

export default {
    setup() {
        const errored = ref(false);
        const spinner = ref(false);
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
            errored, spinner, error, authStore, router, route, credentials, q
        }
    },
    methods: {
        userLogin() {
            spinner.value = true;
            authStore
                .login(credentials.value.email, credentials.value.password)
                .then((data) => {
                    router.push("/");
                }, () => {
                    errored.value = true;
                    spinner.value = false;
                    error.value = "Identifiant ou mot de passe incorrect";
                });

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

.gradient-custom-3 {
    /* fallback for old browsers */
    background-image: url("/img/fond_bleu.svg");
    background-position: bottom;
    background-size: 100%;
    /*background-repeat: no-repeat;
  background-position: center;
  background-size: contain !important;
  background-color: #e8f5ff !important;*/
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
