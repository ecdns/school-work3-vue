<template>
  <div class="card-container">
    <div class="row">
      <div class="q-pa-md">
        <div class="q-gutter-xs q-card">
          <ApexDonut />
        </div>
        <div class="q-gutter-xs q-card">
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
.card-container {
  display: flex;
  justify-content: center;
}

.row {
  display: flex;
  justify-content: center; /* Ajout pour centrer horizontalement */
}

.q-pa-md {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; /* Ajout pour centrer verticalement */
}

.q-gutter-xs {
  width: 400px;
  margin: 2rem;
  height: 350px;
}

.q-card {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
