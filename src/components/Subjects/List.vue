<template>
  <section>
    <!-- lista -->
    <div class="marginTop">
      <div class="columns is-multiline ">
        <div v-for="subject in subjects" :key="subject.id" class="column is-3">
          <div class="box">
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
      <p>
        Click em "<font-awesome-icon :icon="['fas', 'plus']" />" para adicionar
        sua primeira materia
      </p>
    </div>
  </section>
</template>

<script>
import Subject from "../../Models/Subjects";
export default {
  props: {
    subjects: Array
  },
  methods: {
    async check(id) {
      this.$emit("isLoading");
      await Subject.check(id);
      this.$emit("checked");
    }
  }
};
</script>
