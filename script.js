const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

function addUUID(path) {
  const JSONFile = require(path);
  JSONFile.map((item) => {
    item.id = uuid.v4();
  });
  fs.writeFileSync(path, JSON.stringify(JSONFile));
}

addUUID("./vrchat/pages/fetch/assets.json");
addUUID("./vrchat/pages/fetch/premium-base.json");
addUUID("./vrchat/pages/fetch/premium-clothes.json");
addUUID("./vrchat/pages/fetch/premium-furry-base.json");
addUUID("./vrchat/pages/fetch/premium-hair.json");
addUUID("./vrchat/pages/fetch/shaders.json");
addUUID("./vrchat/pages/fetch/textures.json");
