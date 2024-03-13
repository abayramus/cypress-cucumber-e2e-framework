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
            return results;
          }
        });

        
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});