const fs = require('fs');

module.exports = async (config) => {
  try {
    fs.writeFileSync('config.json', JSON.stringify(config), { encoding: 'utf-8' });
  } catch (error) {
    console.log(error);
  }
};
