const chalk = require("chalk");

class ScopeRegistryDangerousError extends Error {
  constructor(props) {
    super(props);

    this.name = "ScopeRegistryDangerousError";
    this.message = chalk.red(`Cannot publish this package since you have provided public custom registry for secure-publish scope.`);
    this.info = `${chalk.blue("Please, provide private custom registry in your")} ${chalk.magenta(".npmrc")}.`;
    this.hint = `${chalk.blue("A valid example of private scoped registry would be:")} ${chalk.green("@company-scope:registry=http://company-scope.registry.com")}`
  }
}

class ScopeNotSetNpmConfigRegistryDangerousError extends Error {
  constructor(props) {
    super(props);

    this.name = "ScopeNotSetNpmConfigRegistryDangerousError";

    this.message = chalk.red(`Cannot publish this package since you have not provided private scope registry and you have a public one in your npm config.`);
    this.info = chalk.blue(`Please, provide either scoped or non-scoped custom registry in your ${chalk.magenta(".npmrc")}.`);
    this.hint = `${chalk.bgGreen("[RECOMMENDED]")} ${chalk.blue("A valid example of private scoped registry would be:")} ${chalk.green("@company-scope:registry=http://company-scope.registry.com")}\n\n${chalk.bgYellow("[NOT RECOMMENDED]")} ${chalk.yellow("A valid example of private registry configuration for")} ${chalk.bgRed("ALL")} ${chalk.yellow("of your packages would be:")} ${chalk.green("registry=http://company.registry.com")}`;
  }
}

class NpmConfigRegistryDangerousError extends Error {
  constructor(props) {
    super(props);

    this.name = "NpmConfigRegistryDangerousError";
    this.message = chalk.red(`Cannot publish this package since you haven't provided custom registry.`);
    this.info = chalk.blue(`Please, provide it in your ${chalk.magenta(".npmrc")}.`)
    this.hint = chalk.blue(`A valid example would be: ${chalk.green("registry=http://company.registry.com")}`);
  }
}

module.exports = {
  ScopeRegistryDangerousError,
  ScopeNotSetNpmConfigRegistryDangerousError,
  NpmConfigRegistryDangerousError
};
