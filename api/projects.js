const fs = require('fs');

export default function (req, res, next) {
  const filePath = './assets/json-data/projects.json';
  const data = fs.readFileSync(filePath, 'utf8');
  res.end(data);

  // next();
}
