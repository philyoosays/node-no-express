## Redis details

This is assuming a redis server is running locally. I ran it in my CLI.


## Install

```bash
$ npm i
$ npm start
```

## API details

`http://localhost:5000/comments`

`GET` - returns an array

`POST` - Expects JSON object with one key - `comments: string`

## Config Vars

Supplied by process.env

`CACHE_EX` - Cache expiration in seconds

`PORT` - Server port (default: 5000)
