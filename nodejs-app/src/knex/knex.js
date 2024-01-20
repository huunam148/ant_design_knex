import knex from "knex";
import knexFile from "../../knexfile.js";

const environment = process.env.NODE_ENV || "development";

module.exports = knex(knexFile[environment]);

