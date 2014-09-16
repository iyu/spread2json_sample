Spread2Json Sample
==========

[Spread2Json](https://github.com/yuhei-a/spread2json.git) sample project.

## Usage
### Source checkout
```
$ git clone https://github.com/yuhei-a/spread2json_sample.git
$ cd ./spread2json_sample
$ npm install
```

### Generate API client key
[Google API Console](https://console.developers.google.com/)
  
1. Create project
2. Create new Client ID ([APIs & auth] > [Credentials] > [Create new Client ID])
~~~
APPLICATION TYPE: Web application
AUTHORIZED JAVASCRIPT ORIGINS: http://localhost:3000
AUTHORIZED REDIRECT URL: http://localhost:3000/oauth2callback
~~~
> TODO picture

### Edit opts.json
YOUR CLIENT ID & CLIENT SECRET
```
$ vi opts.json
```

### Start Server
```
$ npm start

> spread2json_sample@0.0.1 start /Users/aihara_yuhei/Documents/git/yuhei-a/spread2json_sample
> DEBUG=spread2json_sample node ./bin/www

 [INFO] [2014-09-16 13:54:43]  setup (../spread2json/lib/index.js:67)
  spread2json_sample Express server listening on port 3000 +0ms
```

### Access to http://localhost:3000
> TODO picture
