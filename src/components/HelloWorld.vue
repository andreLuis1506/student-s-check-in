<template>
  <div class="hello">
    <h1>Hello World</h1>
    <p>
      This is a simple example of using Electron, Vue and Knex together.<br />
      You can add your informations to the database in sqlite and then list
      it.<br />
      For more details on these technologies visit electronjs.org, vuejs.org,
      knexjs.org.
    </p>
    <form @submit.prevent="add">
      Name:
      <input v-model="name" id="name" required="required" />
      Email:
      <input type="text" v-model="course" id="course" required="required" />
      <br />
      <button type="submit">ADD</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user.id">
        <div>{{ user.name }} / {{ user.course }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import connection from "../database/connection.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      name: "",
      course: "",
      users: []
    };
  },
  async created() {
    this.users = await connection("users").select("*");
  },
  methods: {
    async add() {
      let name = this.name;
      let course = this.course;
      await connection("users").insert({
        name,
        course
      });
      this.users = await connection("users").select("*");
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 20px;
}
li {
  margin: 10px 10px;
}
button {
  margin-top: 20px;
  margin-right: 10px;
}
input {
  margin-right: 20px;
}
p {
  margin-bottom: 50px;
}
</style>
