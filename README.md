This demo uses Laravel+React+Typescript

## Create .env
```
cp .env.example .env
```


## Execute
Install dependencies and generate passport keys
```
composer install
php artisan key:generate
php artisan passport:keys
npm install && npm run build
```

Setup sail's docker environment and choose a database service.
```bash
php artisan sail:install
./vendor/bin/sail up
```

In another terminal, run
```
./vendor/bin/sail artisan migrate
```

By default, the application will be available on [http://localhost](http://localhost)
