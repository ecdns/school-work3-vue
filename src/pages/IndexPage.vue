<template>
  <div class="card-container card-containera">
    <div class="row rowa">
      <div class="q-pa-md q-pa-mda">
        <div class="q-gutter-xs q-card q-gutter-xsa q-carda">
          <ApexDonut />
        </div>
        <div class="q-gutter-xs q-card q-gutter-xsa q-carda">
          <ApexBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexDonut from "components/charts/donut/ApexDonut.vue";
import ApexBar from "components/charts/bar/ApexBar.vue";

export default {
  components: {
    ApexBar,
    ApexDonut,
  },
};
</script>

<style>
.card-containera {
  display: flex;
  justify-content: center;
}

.rowa {
  display: flex;
  justify-content: center; /* Ajout pour centrer horizontalement */
}

.q-pa-mda {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; /* Ajout pour centrer verticalement */
}

.q-gutter-xsa {
  width: 400px;
  margin: 2rem;
  height: 350px;
}

.q-carda {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
