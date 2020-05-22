#!/usr/bin/env node

const chalk = require("chalk");

const securePublish = () => {
  if(typeof process.env.SECURE_PUBLISH_SCOPE !== "string") {
    console.error(chalk.red(
      `Please, provide ${chalk.green("SECURE_PUBLISH_SCOPE")} before running this script in package.json (e.g. "prepublish": "SECURE_PUBLISH_SCOPE=company-scope securePublish").`
    ))

    process.exit(1);
  }

  if (typeof process.env.npm_package_name !== "string") {
    console.error(chalk.red(
      `\nCannot publish this package because you didn't provide any name in your ${chalk.magenta("package.json")}.\n`
    ));

    process.exit(1);
  }

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
};

securePublish();
