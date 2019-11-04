# Github Profile Stats

## What is this?

Github profile stats is a quick node script that makes an api call to a user's github and retrieves
their most recent activity. Then, it filters the activity for most recent push commits and tallies them.

After parsing the data, the script then writes the data in a readable format and pushes it into a gist 
that is displayed on the user's github profile.

## How do I use this?

1. Clone/Fork this repository.
2. Create a file named '.env' in the directory
3. Copy the text from 'user-sample.env' into your '.env'
4. Fill out the information [see](#What-data-do-I-put-in-the-'.env'-file?)
5. Execute the script with 
```shell
MacBook-Pro:github-profile-stats ryanyang$ npm run update
```


## What data do I put in the '.env' file?

Create an empty gist on Github and you should get a link like this:

https://gist.github.com/ryqndev/0d8d1f8ae63085cfc6c850538233d2ae

The last part is your gist id so you should have:
```
GIST_id=0d8d1f8ae63085cfc6c850538233d2ae
```
---
Github token is a private security token that you use to give gist push permissions. Follow the steps [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) to make a Github token
```
GITHUB_TOKEN=sensitivetoken
```
> Note: this token is sensitive and who ever has access to it will be allowed to make changes based on permissions it carries. If you plan on making your version of this software public, do NOT upload your .env file. If you are forking this repo, do not remove the .env from the .gitignore
---
Github user should be your username. In my case https://github.com/ryqndev, the username is ryqndev
```
GITHUB_USER=ryqndev
```