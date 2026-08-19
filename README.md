# CloudProcure Services

Super-repository for the independently buildable Procurement, Supplier, and Order applications. Each service is a public Git submodule with its own lifecycle, database ownership, Maven build, and `main` branch.

## Submission identity

- Student Name: `<STUDENT_NAME>`
- Student Number: `<STUDENT_NUMBER>`
- Slack Handle: `<SLACK_HANDLE>`
- GCP Project ID: `<GCP_PROJECT_ID>`

## Repository structure

| Path | Repository | Data store |
| --- | --- | --- |
| `procurement-service` | `cloudprocure-procurement-service` | PostgreSQL |
| `supplier-service` | `cloudprocure-supplier-service` | MongoDB |
| `order-service` | `cloudprocure-order-service` | PostgreSQL |

## Clone

```powershell
git clone --recurse-submodules https://github.com/thenurinethangi/cloudprocure-services.git
cd cloudprocure-services
git submodule update --init --recursive
```

## Build

Each service builds and deploys independently with its own Maven wrapper:

```powershell
.\procurement-service\mvnw.cmd test
.\supplier-service\mvnw.cmd test
.\order-service\mvnw.cmd test
```

For local development, PostgreSQL is exposed on port 15432 and MongoDB on port 27018. Start Config Server and Eureka before the business services; access public APIs through the API Gateway on port 8088. Internal OpenFeign callbacks remain idempotent, and `/actuator/health` is the baseline health-check endpoint for every service.

The non-destructive GCP preparation assets are under `docs/gcp`. Real GCP infrastructure, managed data services, identities, load balancing, high availability, autoscaling, and deployment verification remain mandatory before academic completion.

