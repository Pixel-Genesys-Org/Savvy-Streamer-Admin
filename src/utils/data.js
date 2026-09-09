const serial_no_option = {
  label: "S. No",
  key: "id",
};

const columns = [
  { label: "Description", key: "description" },
  { label: "Account", key: "account" },
  { label: "Debit", key: "debit" },
  { label: "Credit", key: "credit" },
];

const login_activity = [
  { label: "Login", key: "login" },
  { label: "Logout", key: "logout" },
  { label: "OS", key: "os" },
  { label: "Browser", key: "browser" },
  { label: "IP Address", key: "ip_address" },
  { label: "Location", key: "location" },
  { label: "Latitude", key: "latitude" },
  { label: "Longitude", key: "longitude" },
  { label: "Timezone", key: "timezone" },
];

const sytem_activity = [
  { label: "Date/Time", key: "date" },
  { label: "Action", key: "action" },
  { label: "Log", key: "log" },
  { label: "Affected", key: "affected" },
  { label: "Section", key: "section" },
];

const login_activity_data = [
  {
    id: 1,
    login: "2025-04-07 05:26:20",
    logout: "2025-04-07 05:26:20",
    os: "Windows",
    browser: "Website",
    ip_address: "102.168",
    location: "New York",
    longitude: "70",
    latitude: "63",
    timezone: "America/New York",
  },
  {
    id: 2,
    login: "2025-04-07 05:26:20",
    logout: "2025-04-07 05:26:20",
    os: "Windows",
    browser: "Website",
    ip_address: "102.168",
    location: "New York",
    longitude: "70",
    latitude: "63",
    timezone: "America/New York",
  },
];

const system_activity_data = [
  {
    id: 1,
    date: "2025-04-07 05:26:20",
    action: "2025-04-07 05:26:20",
    log: "New Log",
    affected: "No",
    section: "IT",
  },
];

const data = [
  { id: 1, description: "Sales", account: "Revenue", debit: 0, credit: 500 },
  { id: 2, description: "Purchase", account: "Expense", debit: 300, credit: 0 },
];

const dropdown_options = [
  { label: "Option 1", value: "option_1" },
  { label: "Option 2", value: "option_2" },
  { label: "Option 3", value: "option_3" },
];

const settings = [
  {
    label: "Providers",
    value: "providers",
    children: [
      { label: "Identifier Types", value: "providers.identifier_types" },
      { label: "License Types", value: "providers.license_types" }
    ]
  },
  {
    label: "Payers",
    value: "payers",
    children: [
      { label: "Payers Management", value: "payers.management" },
      { label: "Portal Types", value: "payers.portal_types", route: "/settings/portal-types" }
    ]
  },
  {
    label: "Users",
    value: "users",
    children: [
      { label: "View Roles", value: "users.view_roles", route: "/settings/roles" },
      { label: "Assign Role to User", value: "users.assign_role" }
    ]
  },
  {
    label: "General Settings",
    value: "general_settings",
    children: [
      { label: "Provider Credential Settings", value: "general_settings.provider_credentials" },
      { label: "Facility Credential Settings", value: "general_settings.facility_credentials" }
    ]
  }
]

const tabs_options = [
  { label: "User Login Activity", value: "login_activity" },
  { label: "User Session Activity", value: "session_activity" },
];

const user_data = [
  {
    id: 1,
    profile: "Sales",
    name: "Molly",
    email: "molly@yopmail.com",
    phone: "+1234567890",
    location: "New York",
    gender: "Male",
    last_login: "2 days ago",
  },
  {
    id: 1,
    profile: "Sales",
    name: "Molly",
    email: "molly@yopmail.com",
    phone: "+1234567890",
    location: "New York",
    gender: "Male",
    last_login: "1 week ago",
  },
];

export {
  serial_no_option,
  columns,
  data,
  dropdown_options,
  settings,
  tabs_options,
  user_data,
  login_activity,
  login_activity_data,
  sytem_activity,
  system_activity_data,
}
