# Server


## Start Development

```bash
# up dockers first
docker-compose up -d

# run dev
pnpm run dev
```

## DB

you need an ormconfig.js file as below 
ormconfig.js

refer to: https://typeorm.io/#/using-ormconfig

```javascript
module.exports = {
  database: 'real_db',
  host: 'localhost',
  password: 'dev-12345',
  port: 9876,
  type: 'mariadb',
  username: 'dev',
}
```


