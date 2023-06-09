<template>
  <div class="card-container card-containera">
    <div class="row rowa">
      <div class="q-pa-md q-pa-mda">
        <div class="q-gutter-xs q-card q-gutter-xsa q-carda">
          <ApexDonut />
        </div>
        <div class="q-gutter-xs q-card q-gutter-xsa q-carda">
          <ApexPolarArea />
        </div>
<!--        <div class="q-gutter-xs q-card q-gutter-xsa q-carda">
          <ApexColumn />
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import ApexDonut from "components/charts/donut/ApexDonut.vue";
import ApexBar from "components/charts/bar/ApexBar.vue";
import ApexPolarArea from "components/charts/polarArea/ApexPolarArea.vue";
import ApexColumn from "components/charts/column/ApexColumn.vue";

export default {
  components: {
 /*   ApexColumn,*/
    ApexPolarArea,
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
