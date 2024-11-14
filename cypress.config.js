const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.booking.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1920,
    viewportHeight: 900
  },
  watchForFileChanges: false,
  env: {
    prod_api: 'https://account.booking.com/api/'
  }
});
