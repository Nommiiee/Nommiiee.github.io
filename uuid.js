const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

async function addingIdToJSON(directory) {
  fs.readdir(directory, (err, file) => {
    if (err) {
      console.log(err);
      return;
    }

    file.forEach((filename) => {
      if (filename.endsWith(".json")) {
        const filePath = path.join(directory, filename);

        fs.readFile(filePath, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }

          const jsonData = JSON.parse(data);
          for (const object of jsonData) {
            object.id = uuidv4();
          }

          fs.writeFile(filePath, JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Added unique ID to ${filename}`);
            }
          });
        });
      }
    });
  });
}

addingIdToJSON("./vrchat/Pages/fetch");
