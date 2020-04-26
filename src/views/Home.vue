<template>
  <section>
    <b-modal :active.sync="isFistTime" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <h1 class="title">Primeira vez aqui? Legal!</h1>
          <p class="subtitle">Vamos começar!</p>
          <b-button class="is-primary" @click="isFistTime = false"
            >Click aqui para cadastrar</b-button
          >
        </div>
      </div>
    </b-modal>

    <div class="hero is-primary is-fullheight is-bold">
      <div class="hero-body">
        <div class="container" v-show="!isFistTime">
          <h1 class="title">Começando...</h1>
          <p class="subtitle">
            Se apresente. Diga seu nome e qual o seu curso.
          </p>
          <form  @submit.prevent="register">
            <b-field label="Nome" label-position="inside">
              <b-input
                class="marginTop"
                placeholder="André Luis"
                v-model="name"
                required
              ></b-input>
            </b-field>
            <b-field label="Curso" label-position="inside">
              <b-input
                class="marginTop"
                placeholder="Analise de sistemas"
                v-model="course"
                required
              ></b-input>
            </b-field>
            <b-button
              native-type="submit"
              class="is-primary marginTop"
              inverted
              outlined
              >Click aqui para cadastrar</b-button
            >
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import connection from "../database/connection";
export default {
  name: "Home",
  data() {
    return {
      isFistTime: true,
      name: "",
      course: ""
    };
  },
  async created() {
    let count = await connection("users").count("*");
    if (count[0][`count(*)`] > 0) {
      this.isFistTime = false;
      this.$router.push("subjects");
    }
    console.log(this.isFistTime);
  },
  methods: {
    async register() {
      let name = this.name;
      let course = this.course;
      await connection("users").insert({
        name,
        course
      });
      this.$router.push("subjects");
    }
  }
};
</script>

<style>
.marginTop {
  margin-top: 25px;
}
</style>
