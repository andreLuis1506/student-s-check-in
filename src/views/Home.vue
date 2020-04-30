<template>
  <section>
    <div class="hero is-primary is-bold is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Chek-in</h1>
          <p class="subtitle">Bem vindo!</p>
          <b-button @click="go" type="is-primary" inverted outlined>
            <font-awesome-icon :icon="['fas', 'check']" />
          </b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import connection from "../database/connection";
export default {
  methods: {
    async go() {
      let count = await connection("users").count("*");
      if (count[0][`count(*)`] > 0) {
        this.$router.push("subjects");
      } else {
        this.$router.push("register");
      }
    }
  }
};
</script>
