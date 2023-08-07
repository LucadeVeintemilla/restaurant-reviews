import axios from "axios";

export default axios.create({
  baseURL: "https://us-central1.gcp.webhooks.mongodb-realm.com/api/client/v2.0/app/bd-kmbhc/service/analytics/incoming_webhook/analytics",
  headers: {
    "Content-type": "application/json"
  }
});