# Required environment variables


- DEVELOPMENT
- COOKIE_SECRET
- PORT
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_DATABASE
- cloud_name
- api_key
- api_secret
- PAGE_URL

Creating a self signed key:
https://www.digitalocean.com/community/tutorials/how-to-create-an-ssl-certificate-on-nginx-for-ubuntu-14-04

sudo mkdir /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt

Or, just use https://www.sslforfree.com/

// optimize docker build process
Split build into multiple stages, allowing docker to cache each stage
Fixed npm global module error by using yarn global


## Development

```
yarn install
make dev
yarn dev
```

Runs on http://localhost:8000

## Production

```
make prod
```

Runs on http://localhost:80
