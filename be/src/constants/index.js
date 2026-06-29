const ROLES = {
  SYSTEM_ADMIN: "system_admin",
  SCHOOL_ADMIN: "school_admin",
  TEACHER: "teacher",
  STUDENT: "student",
  NURSE: "nurse",
  KITCHEN: "kitchen",
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  INTERNAL_ERROR: 500,
};

module.exports = { ROLES, HTTP_STATUS };
