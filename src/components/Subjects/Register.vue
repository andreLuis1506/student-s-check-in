<template>
  <section>
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
                <option :value="null">Nenhum </option>
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
  </section>
</template>

<script>
import Subject from "../../Models/Subjects";
export default {
  props: {
    subjects: Array
  },
  data() {
    return {
      name: "",
      requirement: null,
      semester: 1
    };
  },
  methods: {
    async register() {
      this.$emit("isLoading");
      await Subject.register(this.name, this.requirement, this.semester);
      this.$emit("registered");
    }
  }
};
</script>
