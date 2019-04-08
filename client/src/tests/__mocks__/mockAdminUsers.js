export const adminUsers = {
  msg: "string",
  payload: {
    adminUsers: [
      {
        id: "string",
        email: "string",
        name: "string",
        roles: [
          {
            id: 0,
            name: "string"
          }
        ]
      }
    ]
  }
};

export const roles = {
  msg: "CREATED", 
  payload: {
    roles: [
      {
        id: 1, 
        isDeleted: false, 
        name: "admin", 
        help: "admin role", 
        timestamps: {
          created_at: "2018-12-06", 
          updated_at: "Thu, 06 Dec 2018 00:00:00 GMT"
        }
      }
    ] 
  }
};

export const permisionData = {
  response: { data: { msg: "OK", } }, 
  role_id: 4, 
  name: "delete_meal_item", 
  keyword: "delete_meal_item" 
};

export const permisions = {
  msg: "OK", 
  payload: {
    permissions: [
      {
        id: 8, 
        isDeleted: false, 
        roleId: 1, 
        name: "create_menu", 
        keyword: "create_menu", 
        timestamps: {
          created_at: "2018-10-16", 
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      }, 
      {
        id: 7, 
        isDeleted: false, 
        roleId: 1, 
        name: "delete_menu", 
        keyword: "delete_menu", 
        timestamps: {
          created_at: "2018-10-16", 
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      }, 
    ] 
  }
};

export const RolePermisions = {
  msg: "OK", 
  payload: {
    role_id: 1, 
    role_permissions: [
      {
        id: 8, 
        isDeleted: false, 
        roleId: 1, 
        name: "create_menu", 
        keyword: "create_menu", 
        timestamps: {
          created_at: "2018-10-16", 
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      },
      {
        id: 231, 
        isDeleted: false, 
        roleId: 1, 
        name: "delete_permissions", 
        keyword: "delete_permissions", 
        timestamps: {
          created_at: "2018-11-01", 
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      }, 
      {
        id: 7, 
        isDeleted: false, 
        roleId: 1, 
        name: "delete_menu", 
        keyword: "delete_menu", 
        timestamps: {
          created_at: "2018-10-16", 
          updated_at: "Tue, 16 Oct 2018 13:27:51 GMT"
        }
      }, 
    ] 
  }
};

export const roleId = 1;
