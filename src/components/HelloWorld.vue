<template>
  <div class="page-text-fields">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          <div slot="widget-content">
            <v-form ref="form" v-model="valid">
              <v-container>
                <v-row row justify="center">
                  <v-flex xs6>
                    <v-text-field
                      label="Casos de pruebas"
                      v-model="model.testCases"
                      :rules="rulesForm.testCases"
                      type="number"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <div class="text-center">
                      <v-btn @click="CreateTestCases">Crear</v-btn>
                    </div>
                  </v-flex>
                </v-row>
                <v-row
                  row
                  justify="center"
                  v-for="iteration in model.iterations"
                  v-bind:key="iteration.id"
                >
                  <v-flex xs6>
                    <v-text-field label="Cubo" v-model="iteration.text" type="text"></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <div class="text-center">
                      <v-btn @click="CreateCube(iteration)">Crear Cubo</v-btn>
                    </div>
                  </v-flex>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Service from '../service'
export default {
  data: () => ({
    service: new Service('Cube'),
    valid: false,
    model: {
      testCases: 0,
      iterations: []
    },
    rulesForm: {
      testCases: [
        v => !!v || "El campo caso de prueba es requerido",
        v => !parseInt(v) <= 0 || "El campo caso de prueba debe ser mayor a 0",
        v =>
          !(parseInt(v) > 50) ||
          "El campo caso de prueba debe ser menor o igual a 50"
      ]
    }
  }),
  methods: {
    CreateTestCases() {
      this.model.iterations = [];
      for (let i = 0; i < this.model.testCases; i++) {
        this.model.iterations.push({
          id: `i${i}`,
          text: "",
          m: 0,
          n: 0,
          value:[]
        });
      }      
    },
    async CreateCube(iteration){      
       try {
            let result = await this.axios.post(`cube/create`, {"Parameter": iteration.text});
            let data = result.data.data;
            iteration.m = data.m;
            iteration.n = data.n;
            iteration.value = data.value;
            console.log(this.model.iterations);
        } catch (e) {
            console.log(e)
        }      
    }
  }
};
</script>
