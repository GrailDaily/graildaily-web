# GrailDaily CMS

# System Architecture

Version: 1.0

---

# Overview

Ekosistem GrailDaily terdiri dari tiga aplikasi utama.

```
             Internet

                 │

        ┌────────┴─────────┐
        │                  │

     Website            CMS Admin

        │                  │
        └────────┬─────────┘

                 │

             REST API

                 │

          PostgreSQL Database

                 │

           Media Storage
```

---

# Applications

## 1. Website

Purpose

Public website.

Technology

Astro

Responsibilities

- Display articles
- Search
- Categories
- SEO
- Newsletter
- Popular
- Latest

---

## 2. CMS

Purpose

Internal dashboard.

Technology

Next.js

Responsibilities

- Manage Articles
- Manage Categories
- Manage Tags
- Manage Media
- Manage Users
- Manage SEO
- Analytics
- AI

---

## 3. API

Purpose

Business Logic.

Technology

Fastify

Responsibilities

- Authentication
- CRUD
- Upload
- Search
- Analytics
- AI Integration

---

# Database

Database digunakan oleh API.

Website tidak pernah mengakses database secara langsung.

CMS juga tidak mengakses database secara langsung.

Semua komunikasi dilakukan melalui API.

---

# Storage

Development

Local Storage

Production

Cloudflare R2

---

# Authentication

JWT

Refresh Token

Role Based Access Control

---

# Deployment

Website

Cloudflare Pages

CMS

Vercel atau VPS

API

Docker VPS

Database

PostgreSQL