async function get_avatar() {
  const request = require("request");
  const fs = require("fs");

  const owner = process.argv[2].split("/")[0];
  const repo = process.argv[2].split("/")[1];
  const token = process.argv[3];

  const options = {
    method: "GET",
    url: "https://api.github.com/repos/" + owner + "/" + repo + "/contributors",
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "Awesome-Octocat-App",
      Authorization: "Bearer " + token,
    },
  };

  avatar_code = "";
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const info = JSON.parse(body);
    for (let index = 0; index < info.length; index++) {
      avatar_code += `![${info[index].login}](${info[index].avatar_url}&s=64)<br>`;
    }
    console.log("Avatar List: ", avatar_code);

    // Update README.md file
    const readmeFile = fs.readFileSync("README.md", "utf8");
    const updatedReadmeFile = readmeFile.replace(
      "<!-- CONTRIBUTORS_AVATARS -->",
      avatar_code
    );
    fs.writeFileSync("README.md", updatedReadmeFile, "utf8");
  });
}

get_avatar();
