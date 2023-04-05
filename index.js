const express = require("express");
const app = express();
const port = 3002; // replace with your preferred port number

function findSmallestUniquePrefix(words, keyword) {
  let dict = {};

  words.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      let prefix = word.slice(0, i + 1);
      dict[prefix] = (dict[prefix] || 0) + 1;
    }
  });

  for (let i = 0; i < keyword.length; i++) {
    let prefix = keyword.slice(0, i + 1);
    if (dict[prefix] === 1) {
      return {
        keyword: keyword,
        status: "found",
        prefix: prefix,
      };
    }
  }

  return {
    keyword: keyword,
    status: "not_found",
    prefix: "not_applicable",
  };
}

app.get("/prefixes", (req, res) => {
  const keywords = req.query.keywords.split(",");
  const results = keywords.map((keyword) =>
    findSmallestUniquePrefix(keywords, keyword)
  );
  console.log(results);
  res.send(results);
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
