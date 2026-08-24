
---

## `cloudprocure-services/README.md`

```markdown
# CloudProcure Services

Business microservices super-repository for the **ProcureFlow Enterprise Procurement System**, developed for the ITS 2130 - Enterprise Cloud Architecture final project.

## Student Information

- **Student Name:** Thenuri Nethangi Nanayakkara
- **Student ID:** 241711017
- **Module:** ITS 2130 - Enterprise Cloud Architecture

## Google Cloud Project

- **Project Name:** ProcureFlow ECA
- **Project ID:** `procureflow-eca`
- **Primary Region:** `us-central1`

## Live Application

**Frontend:**  
https://procureflow-frontend-7vni4yihhq-uc.a.run.app

## Repository Purpose

This repository is the **business services parent / super-repository**.

It contains all backend business microservices as Git submodules.

### Submodules

| Submodule | Responsibility | Database / Storage |
|---|---|---|
| `procurement-service` | Purchase requests, departments, approval lifecycle and attachments | PostgreSQL / Cloud SQL, Cloud Storage |
| `supplier-service` | Supplier and catalog management | MongoDB, Firestore activity events |
| `order-service` | Purchase order lifecycle and service integration | PostgreSQL / Cloud SQL |

Submodule repositories:

- https://github.com/thenurinethangi/cloudprocure-procurement-service
- https://github.com/thenurinethangi/cloudprocure-supplier-service
- https://github.com/thenurinethangi/cloudprocure-order-service

## Backend Deployment

The business services are deployed on **Google Compute Engine Managed Instance Groups**.

The deployment provides:

- Multiple VM instances
- Multi-zone deployment
- Autoscaling
- Health checks
- PM2 process management
- Eureka service registration
- Centralized configuration through Config Server
- API access through Spring Cloud API Gateway

## Data Architecture

The system demonstrates both relational and NoSQL persistence.

### PostgreSQL / Cloud SQL

Used by:

- Procurement Service
- Order Service

### MongoDB

Used by:

- Supplier Service

### Google Firestore

Used for application activity and audit events.

Example events include:

- `SUPPLIER_CREATED`
- `CATALOG_ITEM_CREATED`

### Google Cloud Storage

Used to store purchase request attachments uploaded through the application.

## Service Flow

```text
Cloud Run Frontend
        |
        v
External Load Balancer
        |
        v
API Gateway
        |
        v
Eureka
        |
        +----------------------+
        |          |           |
        v          v           v
 Procurement   Supplier      Order
 Service       Service       Service
    |             |             |
 Cloud SQL      MongoDB       Cloud SQL
    |
 Cloud Storage

Firestore stores activity/audit events.
