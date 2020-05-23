#!/usr/bin/env node
const Guardian = require("./guardian");
const errors = require("./errors");

const dangerousRegistries = [
  "https://registry.yarnpkg.com",
  "https://registry.yarnpkg.com/",
  "https://registry.npmjs.org/",
  "https://registry.npmjs.org"
];

const npmConfigRegistry = process.env.npm_config_registry;
const isNpmConfigRegistrySet = typeof npmConfigRegistry === "string";
const isNpmConfigRegistryDangerous = !isNpmConfigRegistrySet || dangerousRegistries.includes(npmConfigRegistry);

const packageName = process.env.npm_package_name;
const isPackageNameSet = typeof packageName === "string";
const packageScope =
  isPackageNameSet && packageName[0] === "@"
    ? packageName.substring(1, packageName.indexOf("/"))
    : null;


const secureScope = () => {
  const scopeRegistry = process.env[`npm_config__${packageScope}_registry`];
  const isScopeRegistrySet = typeof scopeRegistry === "string";
  const isScopeRegistryDangerous = isScopeRegistrySet && dangerousRegistries.includes(scopeRegistry);

  if (isScopeRegistryDangerous) {
    throw new errors.ScopeRegistryDangerousError();
  }

  if (!isScopeRegistrySet && isNpmConfigRegistryDangerous) {
    throw new errors.ScopeNotSetNpmConfigRegistryDangerousError();
  }
}

const secureFromDangerousRegistries = () => {
  if (isNpmConfigRegistryDangerous) {
    throw new errors.NpmConfigRegistryDangerousError();
  }
}

const securePublish = ({ useScope }) => {
  if (useScope) {
    secureScope();
  } else {
    secureFromDangerousRegistries();
  }
};

try {
  securePublish({ useScope: typeof packageScope === "string" });
} catch (exception) {
  Guardian.inspect(exception);

  process.exit(1);
}
