export const roles = [
  {
    id: 1,
    isDeleted: false,
    name: "admin",
    help: "admin role",
    timestamp: {
      created_at: "2018-12-06",
      updated_at: "Thu, 06 Dec 2018 00:00:00 GMT"
    }, 
  }];

export const newRole = {
  name: "string"
};  

export const newPermision = {
  role_id: 1,
  name: "string",
  keyword: "string"
};

export const role = [{}];

export const deleteRole = {
  id: 4, 
  isDeleted: false, 
  name: "accountant",
  help: null,
  timestamps: { created_at: "2019-04-17", updated_at: "Tue, 30 Apr 2019 12:06:01 GMT" } 
};