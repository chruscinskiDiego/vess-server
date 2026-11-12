# VESS-SERVER 🚀

[![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Swagger](https://img.shields.io/badge/Swagger-F5A623?style=flat&logo=swagger&logoColor=white)](https://swagger.io)
[![Amazon S3](https://img.shields.io/badge/Amazon%20S3-FF9900?style=flat&logo=amazons3&logoColor=white)](https://aws.amazon.com/s3/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)](https://openai.com)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=githubactions&logoColor=white)](https://github.com/features/actions)

## 📖 About

**VESS-SERVER** is an API built with [NestJS](https://nestjs.com) for the **Advanced Web Programming** course at UTFPR.  
Its main goal is to manage the registrations and operations required to calculate the **VESS method**, providing REST endpoints, secure authentication, and integrations with external services.

---

## Overview

<p align="center">
  <img src="./docs/overview.png" alt="VESS Server diagram" width="1000" />
</p>

---

## ✨ Tech stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Databases:** MongoDB and PostgreSQL
- **API Documentation:** Swagger (OpenAPI)
- **Integrations:**
  - OpenAI (ChatGPT)
  - Amazon S3 (file uploads)
- **Authentication:** JWT Bearer Token + Google OAuth2
- **CI/CD:** GitHub Actions

---

## 🚀 Key features

- User registration and authentication (**JWT + Google OAuth2**)
- VESS method resources management (CRUD and business rules)
- File upload and management via **Amazon S3**
- **OpenAI** integration to assist with AI-generated descriptions
- Auto-generated API docs with **Swagger**
- CI/CD pipelines with **GitHub Actions**

---

_Developed by Diego Chruscinski de Souza for the Advanced Web Programming course at UTFPR._

---

## Local setup

Requirements: Node.js, npm, Docker Compose, PostgreSQL and MongoDB. Google OAuth, S3 uploads and AI assistance also require credentials for their respective providers.

```bash
npm ci
cp .env.example .env
# Fill provider credentials and set local database passwords.
docker compose up -d
npm run start:dev
```

Database connection settings must match the Compose settings. The current MongoDB connection is assembled for localhost using MONGO_COMPOSE_* variables.

Swagger is served at /doc; the default application port is 3000. The frontend origin is configured as http://localhost:5173 in src/main.ts.

## Configuration notes

- JWT settings are read by the authentication configuration.
- Google OAuth needs a client ID, client secret and callback URL.
- S3 requires a region, bucket and credentials permitted to upload to that bucket.
- AI assistance uses the HTTP client configured in src/open-ai; verify the provider configuration and model availability before enabling it.
- TypeORM synchronize is enabled in the development configuration. Review it before deploying against persistent data.
- The MongoDB Compose service has an invalid TZ value that should be corrected before use.

## Available checks

```bash
npm run build
npm test
```

Tests that initialize application modules require the corresponding dependencies. The repository contains default NestJS tests and does not assert comprehensive coverage of the integrations. There is no LICENSE file in the repository.
