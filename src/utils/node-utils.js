const fs = window.require('fs');
const path = window.require('path');

export const getFile = file => fs.readFileSync(path.join(__dirname, file), 'utf8');
