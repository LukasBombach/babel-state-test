const get = (pass, name) => {
  pass.get(`babel-state-test/${name}`);
};
const set = (pass, name, v) => {
  console.log("set", name, v);
  pass.set(`babel-state-test/${name}`, v);
};

export default function plugin() {
  return {
    visitor: {
      /* Program: {
        enter(path, state) {},
      }, */
      Identifier: (path, state) => {
        const name = path.node.name;
        set(state, "identifier", name);
      },
      JSXElement: (path, state) => {
        const identifier = get(state, "identifier");
        console.log("identifier", identifier);
        /* const attributes = path
          .get("openingElement")
          .get("attributes")
          .map(p => p.get("name").node.name);
        set(state, "attributes", attributes); */
      },
    },
  };
}

function isEventHandler(path) {
  const identifier = path.get("name").node.name;
  const name = typeof identifier === "string" ? identifier : identifier.name;
  return /^on[A-Z]/.test(name);
}
