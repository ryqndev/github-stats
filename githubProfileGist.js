const fs = require('fs');
const request = require('request');

let shadedBlock = '█';
let emptyBlock = '░';

let defaultOptions = {
    username: 'ryqndev',
    commits: true,
}

const makeProfile = async (options = defaultOptions) => {
    const requestOptions = {
        url: `https://api.github.com/users/${options.username}/events`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
        }
    };
    return new Promise((resolve, reject) => {
        request(requestOptions, (error, response, body) => {
            if(!(response && response.statusCode == 200)){
                reject(error);
            }
            resolve(parseStats(JSON.parse(body)));
        });    
    });
      
}
const parseStats = ( githubAPIResponse ) => {
    let repoStats = {
        commits: {
            stats: {
                first: new Date(githubAPIResponse[0].created_at),
                total: 0
            },
            repos: {

            }
        },
    };
    for(let i in githubAPIResponse){
        let event = githubAPIResponse[i];

        parseCommits( repoStats, event );
    }
    return prettyPrintData(repoStats);
}
const parseCommits = ( repoStats, event ) => {
    if(event.type != 'PushEvent') return;
    repoStats['commits']['stats']['total'] += event.payload.size;
    if(event.repo.name in repoStats.commits.repos){
        repoStats['commits']['repos'][event.repo.name] += event.payload.size;
    }else{
        repoStats['commits']['repos'][event.repo.name] = event.payload.size;
    }
}
const printCommits = ( commitData ) => {
    let content = `Most Recent Repo Commit: ${commitData.stats.first.toUTCString()}\n`;
    let repoNames = Object.keys(commitData.repos);
    repoNames.sort( (a, b) => {return commitData.repos[b] - commitData.repos[a]});
    repoNames.forEach(repo => {
        let percent = commitData.repos[repo] / commitData.stats.total;
        let shaded = parseInt(percent * 19) + 1;
        content += `${repo.padEnd(26, ' ')}
            ${shadedBlock.repeat(shaded)}
            ${emptyBlock.repeat(20 - shaded)} 
            ${commitData.repos[repo]} commits\n`;
    })
    return content;
}
const prettyPrintData = ( data ) => {
    let content = '';
    content += printCommits(data.commits);
    fs.writeFile('./profile_gist.txt', content, (err) => {
        if (err) throw err;
    });
    return content;
}

module.exports = makeProfile;