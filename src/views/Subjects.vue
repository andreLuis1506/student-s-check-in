<template>
  <section>
    <div class="hero is-primary is-fullheight is-bold">
      <div class="columns">
        <div class="column doubleMarginTop">
          <h1 class="title">Olá, {{ user.name }}</h1>

        </div>        
        <div class="column doubleMarginTop">
          <p class="title">Studant's <strong style="color:#342F2E">Check-in </strong> <font-awesome-icon :icon="['fas', 'check']" /> </p>
        </div>
      </div>
      <div class="hero-body">
        <div class="container is-fluid box">
          <div class="columns">
            <div class="column is-3 marginTop">
              <p>
                <strong> {{ user.course }} </strong>
              </p>
            </div>
            <div class="column marginTop">
              <b-progress
                type="is-success"
                :value="progress"
                size="is-medium"
                format="percent"
                :precision="1"
                :keep-trailing-zeroes="false"
                show-value
              >
              </b-progress>
            </div>
            <div class="column is-2 marginTop">
              <b-button @click="isRegister = true" class="is-primary " outlined
                ><font-awesome-icon :icon="['fas', 'plus']" /></b-button
              >
            </div>
          </div>
          <!-- lista -->
          <div class="marginTop">
            <div class="columns is-multiline ">
              <div
                v-for="subject in subjects"
                :key="subject.id"
                class="column is-3"
              >
                <div class="box ">
                  <div :class="['hero is-bold titleBox', subject.status]">
                    <h1 class="subtitle">{{ subject.name }}</h1>
                  </div>
                  <br />
                  <p><strong>Semestre:</strong> {{ subject.semester }}°</p>
                  <p>
                    <strong> Requisito:</strong>
                    {{ subject.requirement ? subject.requirement : " NA" }}
                  </p>
                  <b-button
                    v-if="subject.status != 'is-success'"
                    @click="check(subject.id)"
                    class=" marginTop is-primary"
                    outlined
                  >
                    <font-awesome-icon :icon="['fas', 'check']" />
                  </b-button>
                </div>
              </div>
            </div>
          </div>
          <!-- lista vazia -->
          <div v-if="subjects.length == 0" class="marginTop">
            <h1 id="titloMensagem">Vamos começar!!</h1>
            <p>Click em "<font-awesome-icon :icon="['fas', 'plus']" />" para adicionar sua primeira materia</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div>
      <b-modal :active.sync="isRegister" :width="640" scroll="keep">
        <div class="box">
          <h1 class="title">Nova Materia</h1>
          <p class="subtitle">Preencha para cadastrar uma nova materia.</p>
          <form @submit.prevent="register" class="form">
            <b-field label="Nome" label-position="inside">
              <b-input
                class="marginTop"
                placeholder="Calculo"
                v-model="name"
                required
              ></b-input>
            </b-field>
            <div class="columns">
              <div class="column">
                <b-field label="Requisito" label-position="inside">
                  <b-select v-model="requirement" class="marginTop" expanded>
                    <option
                      v-for="subject in subjects"
                      :key="subject.id"
                      :value="subject.id"
                    >
                      {{ subject.name }}</option
                    >
                  </b-select>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Semestre" label-position="inside">
                  <b-input
                    type="number"
                    min="1"
                    class="marginTop"
                    placeholder="20"
                    v-model="semester"
                    required
                  ></b-input>
                </b-field>
              </div>
            </div>
            <b-button
              type="submit"
              native-type="submit"
              class="is-primary "
              outlined
              >Adicionar Materia</b-button
            >
          </form>
        </div>
      </b-modal>
    </div>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
  </section>
</template>

<script>
import User from "../Models/User";
import Subject from "../Models/Subjects";
export default {
  data() {
    return {
      isRegister: false,
      isLoading: false,
      user: {},
      subjects: [],
      progress: 0,
      name: "",
      requirement: null,
      semester: 1
    };
  },
  async created() {
    this.isLoading = true;
    this.user = await User.index();

    this.subjects = await Subject.index();


    this.bar();
    this.isLoading = false;
  },
  methods: {
    async register() {
      this.isLoading = true;
      await Subject.register(this.name, this.requirement, this.semester);
      this.isRegister = false;
      this.subjects = await Subject.index();
      this.bar();
      this.name = "";
      this.requirement = null;
      this.semester = 1;
      this.isLoading = false;
    },
    async check(id) {
      this.isLoading = true;
      await Subject.check(id);
      this.subjects = await Subject.index();
      this.bar();
      this.isLoading = false;
    },
    async bar() {
      let complete;
      let count;
      count = await Subject.count(false);
      complete = await Subject.count(true);
      count = 100 / count;
      this.progress = Math.round(complete * count);
      // this.progress = Math.round(complete * count);
    }
  }
};
</script>

<style>
.marginTop {
  margin-top: 25px;
}
.titleBox {
  padding: 5px;
  border-radius: 25px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.doubleMarginTop{
  margin-top: 50px;
}
#titloMensagem {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
