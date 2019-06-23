import fs from 'fs';

export const saveJson = (path, json) => fs.writeFileSync(path, JSON.stringify(json, null, 2), 'utf8');
export const loadJson = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
