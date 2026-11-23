# Single Vendor Ecommerce Project

[![Python](https://img.shields.io/badge/python-3.x-blue)](https://www.python.org/)
[![Django](https://img.shields.io/badge/django-5.2-orange)](https://www.djangoproject.com/)
[![License](https://img.shields.io/badge/license-none-lightgrey)](#license)

A modern Django-based single-vendor e-commerce storefront with product browsing, cart management, checkout, SSLCommerz payments, user ratings, and social authentication.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Routes](#routes)
- [Authentication & Payment](#authentication--payment)
- [Deployment Notes](#deployment-notes)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository contains a simple single-vendor e-commerce application built with Django. It supports:

- product catalog and category browsing
- shopping cart management
- order checkout
- SSLCommerz payment integration
- user authentication with username/password and Google social login via `django-allauth`
- ratings and reviews for purchased products
- order confirmation email notifications

## Tech Stack

- Python 3.x
- Django 5.2.x
- SQLite (default database)
- `django-allauth` for authentication and social login
- `django-environ` for `.env` configuration
- `sslcommerz-lib` for payment integration
- Pillow for image support

## Features

### Customer Experience

- user registration and login
- product search and category filtering
- product detail pages with ratings and reviews
- cart add/update/remove functionality
- checkout and order creation
- profile page with order history and spending summary

### Commerce Flow

- cart persistence per authenticated user
- order and order item management
- SSLCommerz payment request generation
- payment success/failure/cancel callback handling
- confirmation email rendering via Django email templates

### Admin & Management

- Django admin access for products, categories, orders, and users
- `allauth` account and social account management
- built-in Django static/media handling for development

## Project Structure

```text
eshop/
  manage.py
  eshop/            # project settings and URL configuration
  shop/             # main application
    models.py       # product, cart, order, and rating models
    views.py        # storefront flow and checkout logic
    forms.py        # registration, checkout, and rating forms
    sslcommerz.py   # SSLCommerz payment helper and email sender
    urls.py         # shop URL patterns
  templates/        # HTML templates
  static/           # static asset root
  media/            # uploaded product images
  db.sqlite3        # local SQLite database
  requirements.txt  # Python dependencies
  README.md         # this file
```

## Prerequisites

- Python 3.10+ (or compatible 3.x version)
- Git (optional)
- A virtual environment tool: `venv`, `virtualenv`, or similar

## Installation

```bash
cd "F:/Projects/Single Vendor Ecommerce Project/eshop"
python -m venv eshopenv
# Windows PowerShell
eshopenv\Scripts\Activate.ps1
# Windows CMD
eshopenv\Scripts\activate.bat
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## Environment Configuration

Create a `.env` file in the project root and add the values required by `eshop/settings.py`:

```env
SECRET_KEY=your-secret-key
client_id=your-google-client-id
secret=your-google-client-secret
SSLCOMMERZ_STORE_ID=your-sslcommerz-store-id
SSLCOMMERZ_STORE_PASSWORD=your-sslcommerz-password
SSLCOMMERZ_PAYMENT_URL=https://securepay.sslcommerz.com/gwprocess/v4/api.php
SSLCOMMERZ_VALIDATION_URL=https://securepay.sslcommerz.com/validator/api/validationserverAPI.php
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.example.com
EMAIL_HOST_USER=you@example.com
EMAIL_HOST_PASSWORD=your-email-password
EMAIL_PORT=587
EMAIL_USE_TLS=True
```

### Local email testing

For development, you can temporarily use Django's console backend:

```env
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

> Note: `settings.py` uses `django-environ` to load `.env`. Do not commit secret keys or passwords to source control.

## Database Setup

Run the migrations to create the database schema:

```bash
python manage.py migrate
```

Create a Django superuser for admin access:

```bash
python manage.py createsuperuser
```

## Running Locally

Start the development server:

```bash
python manage.py runserver
```

Open the app in your browser:

- Home: `http://127.0.0.1:8000/`
- Admin: `http://127.0.0.1:8000/admin/`
- Allauth: `http://127.0.0.1:8000/accounts/`

## Routes

| Path | Description |
|---|---|
| `/` | home page |
| `/products/` | product listing (note typo in current route) |
| `/products/<category_slug>/` | category filtered product listing |
| `/products/detail/<slug>/` | product detail page |
| `/cart/` | cart overview |
| `/cart/add/<product_id>/` | add a product to cart |
| `/cart/update/<product_id>/` | update cart item quantity |
| `/cart/remove/<product_id>/` | remove item from cart |
| `/checkout/` | checkout page |
| `/payment/process/` | payment processing endpoint |
| `/payment/success/<order_id>/` | payment success callback |
| `/payment/fail/<order_id>/` | payment failure callback |
| `/payment/cancel/<order_id>/` | payment cancellation callback |
| `/login/`, `/register/`, `/logout/`, `/profile/` | authentication and profile |

## Authentication & Payment

### Authentication

This project uses Django authentication plus `django-allauth` for social login.

- the `accounts/` route is exposed by `allauth`
- Google provider is configured in `eshop/settings.py`
- a `SocialApp` object must be created in Django admin and linked to the site

### Payment

- SSLCommerz is integrated via `shop/sslcommerz.py`
- actual payment behavior depends on environment variables and the configured SSLCommerz gateway
- order confirmation email is sent from `send_order_confirmation_email()`

## Deployment Notes

- `DEBUG=True` is enabled in the current settings and must be disabled for production
- update `ALLOWED_HOSTS` before deployment
- use a production-ready database instead of SQLite
- configure a secure email backend and valid domain URLs
- collect static files with `python manage.py collectstatic`

## Known Issues

- There are no automated test commands documented in this repo
- Payment callback validation is not explicitly described in the current app logic

## Contributing

Contributions are welcome. Suggested improvements include:

- fixing the route typo and adding route tests
- adding pagination and product filtering UI
- enhancing order payment validation
- improving UX for cart and checkout flows
- adding automated tests and CI configuration

## License

This repository does not currently include an explicit license.
