const fs = require('fs');

module.exports = async () => {
  try {
    const config = JSON.parse(fs.readFileSync('config.json', { encoding: 'utf-8' }));
    return config;
  } catch (error) {
    console.log(error);
  }
};
