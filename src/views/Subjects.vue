<template>
  <section>
    <div class="hero is-primary is-fullheight is-bold">
      <h1 id="ola" class="title">Olá, {{ user.name }}</h1>
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
                show-value
              >
                {{ progress }} %
              </b-progress>
            </div>
            <div class="column is-2 marginTop">
              <b-button @click="isRegister = true" class="is-primary " outlined
                >+</b-button
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
                    >check</b-button
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- lista vazia -->
          <div v-if="subjects.length == 0" class="marginTop">
            <h1 id="titloMensagem">Vamos começar!!</h1>
            <p>Click em "+" para adicionar sua primeira materia</p>
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
  </section>
</template>

<script>
import connection from "../database/connection";
export default {
  data() {
    return {
      user: {},
      subjects: [],
      progress: 0,
      isRegister: false,
      name: "",
      requirement: null,
      semester: 1
    };
  },
  async created() {
    this.user = await connection("users")
      .select("*")
      .first();

    this.subjects = await connection("subjects")
      .select("*")
      .orderBy("semester");

    console.log(this.subjects);

    this.bar();
  },
  methods: {
    async register() {
      let name = this.name;
      let status;
      let requirement = this.requirement;
      let semester = this.semester;
      let aux = await connection("subjects")
        .where({ id: requirement })
        .select("status");

      if (aux.length > 0) {
        aux = aux[0][`status`];
      }

      if (aux === "is-success") {
        status = "is-warning";
      } else {
        status = "is-dark";
      }

      await connection("subjects").insert({
        name,
        requirement,
        semester,
        status
      });
      this.isRegister = false;
      this.$router.go();
    },
    async check(id) {
      await connection("subjects")
        .where({ id: id })
        .update({ status: "is-success" });
      await connection("subjects")
        .where({ requirement: id })
        .update({ status: "is-warning" });
      this.$router.go();
    },
    async bar() {
      let complete;
      let aux;
      let count;
      count = await connection("subjects").count("*");
      count = count[0][`count(*)`];
      complete = await connection("subjects")
        .count("*")
        .where({ status: "is-success" });
      complete = complete[0][`count(*)`];
      aux = 100 / count;
      this.progress = Math.round(complete * aux);
      console.log(this.progress);
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
#ola {
  margin-top: 50px;
}
#titloMensagem {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
