# Installing the app 

# Clone repo
```terminal
$ git@github.com:mofath/product-search--mern-elasticsearch.git
```

# Start server
```terminal
$ cd server
```
#### Run docker-compose to bring up the elasticsearch cluster in detached mode
```terminal
$  docker-compose up -d
```

Linux host only: Set vm.max_map_count to at least 262144
```terminal
$  sudo sysctl -w vm.max_map_count=262144
```

#### Run Nodejs server
```terminal
$ npm install
$ npm run dev
```


# Start client
```terminal
$ cd client
$ npm install
$ npm start
```

## Prerequirements
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

