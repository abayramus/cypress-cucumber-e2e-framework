import { defineConfig } from "cypress";
import * as createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

// post gre sql db
const { Pool } = require("pg"); 

// db creds
const dbConfig = {
  user : "select_user",
  host : "managementonschools.com",
  database : "school_management",
  password : "43w5ijfso",
  port : 5432
};


export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

         // Implementing node event listeners for database testing
         on('task', {
          async connectDB(query) {
            const pool = new Pool(dbConfig);
            const results = await pool.query(query);
            await pool.end(); // It's a good practice to close the pool after the operation
            return results;
          },



          // for create a new dean directly in the database
          async createDeanDB(deanDetails) {
            const query = {
              text: 'INSERT INTO dean(birth_day, birth_place, gender, name, password, phone_number, ssn, surname, username) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', // Make sure to include all necessary columns
              values: [deanDetails.dateOfBirth, deanDetails.city, deanDetails.genderMale, deanDetails.deanName,deanDetails.password,deanDetails.phone,deanDetails.ssn,deanDetails.deanSurname,deanDetails.username],
            };
            const pool = new Pool(dbConfig);
            try {
              const results = await pool.query(query);
              await pool.end();
              return results.rows[0]; // Assuming you want to return the created dean
            } catch (err) {
              await pool.end();
              throw err; // It will automatically fail the test if an error occurs
            }
          }
        });
        
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});