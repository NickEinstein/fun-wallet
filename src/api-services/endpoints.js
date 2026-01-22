/* eslint-disable linebreak-style */
const paths = {
  createUser: '/users/create',
  login: '/auth/login',
  getCountries: '/locations/countries',

  // reservations/analytics
  // createInventory: '/staff-manager/inventories/create',
  getDashboardAnalytics: '/staff-manager/analytics ',

  createInventory: '/staff-manager/inventories/create',
  getInventories: '/staff-manager/inventories',
  getInventoriesAnalytics: '/staff-manager/inventories/analytics',
  deleteInventory: '/staff-manager/inventories',
  // singleInventory: '/staff-manager/inventories/analytics',

  getTables: '/staff-manager/tables',
  createTables: '/staff-manager/tables/create',
  assignTables: '/staff-manager/tables/assign',
  getTableAnalytics: '/staff-manager/tables/analytics',

  getReservations: '/staff-manager/reservations',
  creatReservation: '/staff-manager/reservations/create',
  deleteReservation: '/staff-manager/reservations/credeleteate',
  getReservationsAnalytics: '/staff-manager/reservations/analytics',

  getRequests: '/staff-manager/requests',
  getRequestAnalytics: '/staff-manager/requests/analytics',
  postRequestPrices: '/staff-manager/settings/set-request-prices',
  saveCompliance: '/staff-manager/compliance',
  getBusinessInformation: '/staff-manager/settings/business-info',
  updateBusinessInformation: '/staff-manager/settings/business-info',
  getNotificationsSetting: '/staff-manager/settings/notification',
  getPriceSettings: '/staff-manager/settings/price',

  // Location and Banking APIs
  getAllBanks: '/banks',
  getAllStates: '/states',
  getCitiesByState: '/cities', // Will append state ID: /cities/36

  getTransactions: '/staff-manager/transactions',
  getTransactionAnalytics: '/staff-manager/transactions/analytics',

  getEvents: '/staff-manager/events',
  createEvent: '/staff-manager/events/create',
  getOrders: '/staff-manager/orders',
  getSingleOrders: '/staff-manager/order',
  getOrdersAnalytics: '/staff-manager/orders/analytics',
  getEventAnalytics: '/staff-manager/events/analytics',
  cancelOrder: '/staff-manager/orders/cancel',
  downloadQRCode: '/staff-manager/download/qr-code',

  getDiscounts: '/staff-manager/discounts',
  discountsAnalytics: '/staff-manager/discounts/analytics',
  createDiscounts: '/staff-manager/discounts/create',
  updateDiscounts: '/staff-manager/discounts',
  getDiscount: '/staff-manager/discounts',
  deleteDiscount: '/staff-manager/discounts',
  // deleteDiscount: '/api/employee/mdas',

  getFeedbacks: '/staff-manager/feedback',
  getSingleFeedback: '/staff-manager/feedback/1',
  feedbackStatistics: '/staff-manager/feedback/statistics',
  // queryform: '/api/query',

  createStaff: '/staff-manager/staff/create',
  getStaff: '/staff-manager/staff',
  getStaffAnalytics: '/staff-manager/staff/analytics',
  // queryReply: '/api/query/post-reply',
  notificationsSettings: '/staff-manager/settings/notification',
  changePassword: '/staff-manager/settings/change-password',
  changePin: '/staff-manager/transactions/change-pin',
  priceSettings: '/staff-manager/settings/price',
  // meetingAssign: '/api/request-assignment/meeting-assignments',
  getLoyaltyAnalytics: '/staff-manager/loyalties/analytics',
  deleteLoyaltiyHistory: '/staff-manager/loyalties',
  getLoyaltiy: '/staff-manager/loyalties',
  getLoyaltiyHistory: '/staff-manager/loyalties/history',

  // Content APIs
  getAllContents: '/contents/all',
  likeContent: '/interactions/contents',
  commentContent: '/interactions/contents',
  // User APIs
  getAllUsers: '/users/all',
  getUserProfile: '/users',
  getUserContents: '/users',
  subscribeToUser: '/users',
  createSubscription: '/subscriptions/create'
}

export default paths
