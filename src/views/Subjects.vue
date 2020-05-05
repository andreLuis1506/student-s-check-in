<template>
  <section>
    <div class="hero is-primary is-fullheight is-bold">
      <div class="columns">
        <div class="column doubleMarginTop">
          <h1 class="title">Olá, {{ user.name }}</h1>
        </div>
        <div class="column doubleMarginTop">
          <p class="title">
            Studant's <strong class="has-text-dark">Check-in </strong>
            <font-awesome-icon :icon="['fas', 'check']" />
          </p>
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
                ><font-awesome-icon :icon="['fas', 'plus']"
              /></b-button>
            </div>
          </div>
          <!-- lista -->
          <List
            :subjects="subjects"
            @isLoading="isLoading = true"
            @checked="checked"
          />
          <!-- lista -->
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div>
      <b-modal :active.sync="isRegister" :width="640" scroll="keep">
        <Register
          :subjects="subjects"
          @registered="registered"
          @isLoading="isLoading = true"
        />
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
import Register from "../components/Subjects/Register";
import List from "../components/Subjects/List";
export default {
  components: {
    Register,
    List
  },
  data() {
    return {
      isRegister: false,
      isLoading: false,
      user: {},
      subjects: [],
      progress: 0
    };
  },
  async created() {
    this.isLoading = true;
    this.user = await User.index();
    this.subjects = await Subject.index();
    this.isLoading = false;
  },
  methods: {
    async registered() {
      this.isLoading = true;
      this.isRegister = false;
      this.subjects = await Subject.index();
      this.isLoading = false;
    },
    async checked() {
      this.subjects = await Subject.index();
      this.isLoading = false;
    }
  },
  watch: {
    async subjects() {
      let complete;
      let count;
      count = await Subject.count(false);
      complete = await Subject.count(true);
      count = 100 / count;
      this.progress = Math.round(complete * count);
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
.doubleMarginTop {
  margin-top: 50px;
}
#titloMensagem {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
