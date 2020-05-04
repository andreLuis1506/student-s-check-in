const connection = require('../database/connection');

module.exports= {
    async index(){
       return await connection("users")
      .select("*")
      .first();
    }, 

    async register(name, course){
        await connection("users").insert({
            name,
            course
        });
    }

}