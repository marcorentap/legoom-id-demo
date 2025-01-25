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

### Quick hack
Replace `vendor/laravel/passport/src/Http/Controllers/AuthorizationController.php` with [this AuthorizationController](https://gist.github.com/marcorentap/740046418fa270146ab0302b7067843b).

---

Setup sail's docker environment and choose a database service.
```bash
php artisan sail:install
./vendor/bin/sail up
```

In another terminal, run
```
./vendor/bin/sail artisan migrate
```

Generate client id and secret and save it. If you are using the [demo app](https://github.com/marcorentap/legoom-app-demo), the callback is `<DEMO_APP_URL>/callback`
```
./vendor/bin/sail artisan passport:client
```

By default, the application will be available on [http://localhost](http://localhost)
