// Database secrets are injected by the VM secret/bootstrap mechanism, never committed here.
const common = {
  autorestart: true,
  max_restarts: 10,
  restart_delay: 5000,
  env: {
    SPRING_PROFILES_ACTIVE: "prod",
    CONFIG_SERVER_URL: "<INTERNAL_CONFIG_SERVER_URL>",
    EUREKA_SERVER_URL: "<INTERNAL_EUREKA_URL>",
    GCP_PROJECT_ID: "<GCP_PROJECT_ID>",
    FIRESTORE_DATABASE_ID: "(default)",
  },
};

module.exports = {
  apps: [
    {
      ...common,
      name: "cloudprocure-procurement-service",
      script: "java",
      args: "-XX:MaxRAMPercentage=70 -jar <PROCUREMENT_SERVICE_JAR>",
      cwd: "/opt/cloudprocure/procurement-service",
      env: { ...common.env, SERVER_PORT: "8081", DB_HOST: "<CLOUD_SQL_PRIVATE_IP>", DB_NAME: "<PROCUREMENT_DB_NAME>", DB_USERNAME: "<PROCUREMENT_DB_USER>", GCS_BUCKET_NAME: "<PROCUREMENT_BUCKET>" },
    },
    {
      ...common,
      name: "cloudprocure-supplier-service",
      script: "java",
      args: "-XX:MaxRAMPercentage=70 -jar <SUPPLIER_SERVICE_JAR>",
      cwd: "/opt/cloudprocure/supplier-service",
      env: { ...common.env, SERVER_PORT: "8082", MONGODB_URI: "<SECRET_INJECTED_MONGODB_URI>" },
    },
    {
      ...common,
      name: "cloudprocure-order-service",
      script: "java",
      args: "-XX:MaxRAMPercentage=70 -jar <ORDER_SERVICE_JAR>",
      cwd: "/opt/cloudprocure/order-service",
      env: { ...common.env, SERVER_PORT: "8083", DB_HOST: "<CLOUD_SQL_PRIVATE_IP>", DB_NAME: "<ORDER_DB_NAME>", DB_USERNAME: "<ORDER_DB_USER>", GCS_BUCKET_NAME: "<ORDER_BUCKET>" },
    },
  ],
};
