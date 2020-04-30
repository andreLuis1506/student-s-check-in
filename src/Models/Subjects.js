const connection = require("../database/connection");

module.exports = {
  async index() {
    return await connection("subjects")
      .select("*")
      .orderBy("semester");
  },

  async register(name, requirement, semester) {
    let status;
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
  },

  async check(id) {
    await connection("subjects")
      .where({ id: id })
      .update({ status: "is-success" });
    await connection("subjects")
      .where({ requirement: id })
      .update({ status: "is-warning" });
  }
};
