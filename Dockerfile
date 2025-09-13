# Use PHP 8.4.12 with FPM
FROM php:8.4.12-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# Install Node.js (LTS) from NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy only dependency files (for caching)
COPY composer.json composer.lock* ./
COPY package.json package-lock.json* vite.config.* ./

# Install PHP & JS dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts \
    && npm install

# Copy the full project (but skip vendor & node_modules from host)
COPY . .

# Optimize autoload
RUN composer dump-autoload --optimize

# Fix permissions for Laravel
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Start Laravel (PHP) + Vite (JS) together
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=8000 & npm run dev -- --host 0.0.0.0 --port=5173"]
