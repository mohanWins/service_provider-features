const BASE_URL = "http://localhost:3002/api/v1";

const ROUTES = {
  ADMIN_ROUTES: {
    GET_CATEGORIES: `${BASE_URL}/category-list`,
    CREATE_SERVICE: `${BASE_URL}/service/create`,
    EDIT_SERVICE: `${BASE_URL}/service/update`,
    CREATE_CATEGORY: `${BASE_URL}/service-category/create`,
    EDIT_CATEGORY: `${BASE_URL}/service-category/update`,
    CREATE_PROVIDER: `${BASE_URL}/provider/create`,
    EDIT_PROVIDER: `${BASE_URL}/provider/update`,
    GET_ADMIN_DASHBOARD: `${BASE_URL}/admin-dashboard`,
    ASSIGN_SERVICE: `${BASE_URL}/provider-service/create`,
    VALIDATE_ADMIN: `${BASE_URL}/validate-auth`,
  },

  PROVIDER_ROUTES: {
    EDIT_PROVIDER_SERVICE: `${BASE_URL}/update-services-by-provider`,
    PROVIDER_DASHBOARD: `${BASE_URL}/provider-dashboard/`,
  },

  PUBLIC_ROUTES: {
    POST_UNSUCCESSFUL_REFERRAL: `${BASE_URL}/update-provider-service-status`,
    GET_STATUS_HISTORY: `${BASE_URL}/provider-history/`,
    PUBLIC_DASHBOARD: `${BASE_URL}/customer-dashboard`,
  },
};

export default ROUTES;
