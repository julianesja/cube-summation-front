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
                  <v-flex xs8>
                    <v-container>
                      <v-row>
                        <v-flex xs8>
                          <v-text-field label="Cubo" v-model="iteration.text" type="text"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <div class="text-center">
                            <v-btn @click="CreateCube(iteration)">Crear Cubo</v-btn>
                          </div>
                        </v-flex>
                      </v-row>
                      <v-row v-for="operation in iteration.operations" v-bind:key="operation.id">
                        <v-flex xs8>
                          <v-text-field label="Operación" v-model="operation.text" type="text"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <div class="text-center">
                            <v-btn @click="CreateQuery(operation, iteration)">Ejecutar</v-btn>
                          </div>
                        </v-flex>
                        <v-flex xs12 v-if="operation.result!= ''">
                          <span>{{operation.result}}</span>
                        </v-flex>
                      </v-row>
                    </v-container>
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
import message from '../plugins/message'
export default {
  data: () => ({
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
          value: [],
          operations: []
        });
      }
    },
    async CreateCube(iteration) {
      try {
        let result = await this.axios.post(`cube/create`, {
          Parameter: iteration.text
        });
        let data = result.data.data;
        iteration.m = data.m;
        iteration.n = data.n;
        iteration.value = data.value;
        for (let i = 0; i < iteration.m; i++) {
          iteration.operations.push({
            id: `o${i}`,
            text: "",
            result: ""
          });
        }        
      } catch (e) {
        
        message.simpleMessage(e.response.data.message, message.messageType.error );
      }
    },
    async CreateQuery(operation, iteration) {
      try{       
        let result = await this.axios.post('cube/query',{
                                                          value: iteration.value
                                                          , n:iteration.n
                                                          , m:iteration.m
                                                          , query:operation.text 
                                                        }
                                          );
        let data = result.data.data;
        iteration.value = data.value;
        operation.result = result.data.message;

      }catch(e){
        message.simpleMessage(e.response.data.message, message.messageType.error );
      }
    }
  }
};
</script>
