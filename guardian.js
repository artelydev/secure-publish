class Guardian {
  static inspect = (exception) => {
    this.#shout(exception.message);
    if (exception.info) this.#explain(exception.info);
    if (exception.hint) this.#advice(exception.hint);
  }

  static #shout = (message) => {
    console.error(`\n${message}\n`);
  }

  static #explain = (information) => {
    console.info(`${information}\n`);
  }

  static #advice = (instructions) => {
    console.info(`${instructions}\n`);
  }
}

module.exports = Guardian;
