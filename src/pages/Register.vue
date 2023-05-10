<template>
    <section class="flex flex-center fit gradient-custom-3 register-page">
        <div class="container fit">
            <div class="column flex-center no-wrap fit">
                <div class="row flex-center fit">
                    <div class="col-12 col-md-8">
                        <div class="card shadow-2-strong" style="border-radius: 1rem">
                            <div class="column card-body q-pa-xl">
                                <div class="text-center">
                                    <router-link to="/" style="white-space: nowrap">
                                        <img alt="logo" src="/img/Logo_Walking_Dog.png" height="150" />
                                    </router-link>
                                </div>
                                <h2 class="text-weight-bold text-center register-title">
                                    Inscription
                                </h2>

                                <q-banner inline-actions class="text-white bg-green" v-if="success">
                                    <template v-slot:avatar>
                                        <q-icon name="info" color="white" />
                                    </template>
                                    <b>Votre compte a bien été créé</b><br />
                                    vous allez recevoir un mail de confirmation pour valider votre
                                    inscription.
                                </q-banner>

                                <q-form @submit.prevent="onSubmit" autocomplete="off" autocapitalize="off" v-if="!success">
                                    <q-input outlined dense v-model="form.username" type="text" label="Pseudo" lazy-rules
                                        :rules="[
                                            (val) =>
                                                (val !== null && val !== '') ||
                                                'Veuillez entrer  votre pseudo',
                                            (val) =>
                                                (val && val.length <= 255) ||
                                                'Veuillez utiliser au maximum 255 caractères',
                                        ]" />
                                    <q-input outlined dense v-model="form.email" type="email" label="Email" lazy-rules
                                        :rules="[(val) => !!val || 'Email incorrect']" />
                                    <q-input v-model="form.password" dense outlined clearable label="Mot de passe"
                                        :type="isPwd ? 'password' : 'text'" :rules="[
                                            (val) =>
                                                (val !== null && val !== '') ||
                                                'Veuillez entrer un mot de passe',
                                            (val) =>
                                                (val && val.length > 4) ||
                                                'Veuillez utiliser au minimum 4 caractères',
                                            (val) =>
                                                (val && val.length < 32) ||
                                                'Veuillez utiliser au maximum 32 caractères',
                                        ]">
                                        <template v-slot:append>
                                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                                @click="isPwd = !isPwd" />
                                        </template>
                                    </q-input>
                                    <q-input outlined dense type="date" v-model="form.birthDate" label="Date de naissance"
                                        lazy-rules :rules="[(val) => dateEnabled(val)]" stack-label>
                                        <template #prepend>
                                            <q-icon name="event"></q-icon>
                                        </template>
                                    </q-input>
                                    <div class="cgu q-my-lg">
                                        <q-toggle v-model="agree" />
                                        <p>
                                            En m'inscrivant sur Communica j'accepte les
                                            <a href="https://communica.fr/conditions-generales-utilisation/"
                                                target="_blank">Conditions Générales d'Utilisation.</a>
                                        </p>
                                    </div>
                                    <div class="text-center">
                                        <q-btn class="btn btn-block fit q-pa-sm" style="
                          background-color: #ed2144;
                          border-radius: 20px 20px;
                        " type="submit">
                                            <q-spinner v-if="spinner" variant="light" />
                                            <span v-show="!spinner">Envoyer</span>
                                        </q-btn>
                                    </div>
                                    <q-separator />
                                    <div class="text-center text-muted q-mt-md">
                                        Vous êtes déjà inscrit ?
                                        <router-link to="/login" class="fw-bold text-body">
                                            Connectez-vous
                                        </router-link>
                                    </div>
                                </q-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
import { useResource } from "src/composables/resources";
import { useQuasar } from "quasar";
import moment from "moment";

export default {
    name: "register",
    layout: "authentication",
    setup() {
        const users = useResource("users");
        const q = useQuasar();

        return { users, q };
    },
    data() {
        return {
            form: {},
            agree: false,
            success: false,
            isPwd: true,
            spinner: false,
        };
    },
    methods: {
        isValidEmail(value) {
            const emailPattern =
                /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gm;

            return emailPattern.test(value);
        },
        onSubmit() {
            let data = { ...this.form };
            data.birthDate = this.form.birthDate;
            if (this.agree == false) {
                this.q.notify({
                    position: "top",
                    type: "negative",
                    message: `Veuillez accepter les CGU.`,
                });
                return false;
            }

            this.spinner = true;

            this.users
                .create(data)
                .then(() => {
                    this.success = true;
                })
                .catch((error) => {
                    this.q.notify({
                        position: "top",
                        type: "negative",
                        message: `Impossible de créer l'utilisateur car l'email ou le pseudo existe déja`,
                    });
                    this.spinner = false;
                });
        },
        dateEnabled(date) {
            let dateMax = moment(moment().subtract(18, "years").calendar()).format(
                "YYYY/MM/DD"
            );
            if (date < dateMax) {
                return true;
            } else {
                this.q.notify({
                    position: "top",
                    type: "negative",
                    message: "Vous devez être majeur pour vous inscrire sur Comunica",
                });
                return false;
            }
            return date < dateMax;
        },
    },
};
</script>
  
<style lang="scss" scoped>
a {
    color: grey;

    &:hover {
        color: #46b9cc;
    }
}

.register-page .container {
    font-family: "Nunito", sans-serif;
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

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
}

.btn {
    font-family: "Nunito", sans-serif;
    font-weight: bold;
    color: white;
    text-transform: none;
    font-size: 1.5em;
}

.register-title {
    font-size: 1.5rem;
    color: #ed2144;
    margin-top: 0px;
    margin-bottom: 30px;
}

.register-page .register-button {
    background-color: #ed2144;
    color: white;
    width: 100%;
}

.bottom p {
    font-size: 0.8rem;
}

.bottom a {
    color: #46b9cc;
}

.cgu {
    font-size: 0.8rem;
    display: flex;
}

.cgu p {
    padding: 0;
    margin: 0;
    text-decoration: none;
}

.info {
    color: red;
    font-size: 0.7em;
    margin: 0;
    padding: 0;
    text-align: center;
}
</style>
<style lang="scss">
.q-card {
    border-radius: 10px;
    width: auto;
    height: 70%;
    overflow: auto;
}

@media (max-width: $breakpoint-xs-max) {
    .card {
        background-color: rgba(255, 255, 255, 0.8) !important;
        border: 0px !important;
    }

    .q-card {
        width: auto;
        box-shadow: none;
        margin: auto;
    }
}

@media (max-width: 800px) {
    .q-card {
        height: 75vh;
        width: auto;
        box-shadow: none;
        margin: auto;
    }
}
</style>
  