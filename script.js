require('dotenv').config()
const ProfileGistMaker = require('./githubProfileGist.js');

const { GIST_ID, GITHUB_TOKEN, GITHUB_USER } = process.env
let options = {
    username: GITHUB_USER,
    token: GITHUB_TOKEN,
    gistid: GIST_ID
}

ProfileGistMaker(options);