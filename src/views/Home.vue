<template>
  <section>
    <div class="hero is-primary is-bold is-fullheight">
      <div class="hero-body">
        <div class="container">
          <p class="title">
            Studant's <strong style="color:#342F2E">Check-in </strong>
            <font-awesome-icon :icon="['fas', 'check']" />
          </p>
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
import User from "../Models/User";
export default {
  methods: {
    async go() {
      if (await User.index()) {
        this.$router.push("subjects");
      } else {
        this.$router.push("register");
      }
    }
  }
};
</script>
