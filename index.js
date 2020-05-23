#!/usr/bin/env node

const chalk = require("chalk");
require("dotenv").config();

const dangerousRegistries = [
  "https://registry.yarnpkg.com",
  "https://registry.yarnpkg.com/",
  "https://registry.npmjs.org/",
  "https://registry.npmjs.org"
];

const secureScope = () => {
  if (typeof process.env.SECURE_PUBLISH_SCOPE === "string") {
    if (process.env.npm_package_name.indexOf(`@${process.env.SECURE_PUBLISH_SCOPE}/`) !== 0) {
      console.error(chalk.red(
        `\nCannot publish this package outside of scope.\n`
      ))

      console.info(chalk.blue(
        `You are trying to publish this package outside of secure-publish scope. A valid example of package name would be: ${chalk.green('"name": "@company-scope/package-name"')}. Please, check your ${chalk.magenta("package.json")}.\n`
      ));

      process.exit(1);
    }

    if (typeof process.env[`npm_config__${process.env.SECURE_PUBLISH_SCOPE}_registry`] !== "string") {
      console.error(chalk.red(
        `\nCannot publish this package since you haven't provided custom registry for secure-publish scope.\n`
      ));

      console.info(chalk.blue(
        `Please, provide it in your ${chalk.magenta(".npmrc")}. A valid example would be: ${chalk.green("@company-scope:registry=http://company-scope.registry.com")}\n`
      ))

      process.exit(1);
    }
  }
}

const secureRegistries = () => {
  if (typeof process.env.npm_config_registry !== "string" || dangerousRegistries.includes(process.env.npm_config_registry)) {
    console.error(chalk.red(
      `\nCannot publish this package since you haven't provided custom registry for secure-publish.\n`
    ));

    console.info(chalk.blue(
      `Please, provide it in your ${chalk.magenta(".npmrc")}. A valid example would be: ${chalk.green("registry=http://company-scope.registry.com")}\n`
    ))

    process.exit(1);
  }
}

const securePublish = ({ useScope }) => {
  if (useScope) {
    secureScope();
  } else {
    secureRegistries();
  }
};

securePublish({ useScope: typeof process.env.SECURE_PUBLISH_SCOPE === "string" });
