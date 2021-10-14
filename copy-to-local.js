const fs = require('fs-extra');

const srcDir = `./dist`;
const destDir = `D:\\DevSpace/cites-peru/mm-cites-peru/node_modules/yellicode-java-extension`;
// Move to mm
fs.copySync(srcDir, destDir);
console.log('yellicode-java-extension updated');
