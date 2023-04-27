//this is used to define which roles are allowed to access which routes
const userPermissions = {
  getUsers: {
    roles: ["Admin"],
  },
  updateUser: {
    roles: ["Admin"],
  },
  addProject: {
    roles: ["Admin", "Product Owner"],
  },
  deleteProject: {
    roles: ["Admin", "Product Owner"],
  },
  getAllProjects: {
    roles: ["Admin", "Product Owner", "Mitarbeiter"],
  },
  updateProject: {
    roles: ["Admin", "Product Owner"],
  },
  getProjects: {
    roles: ["Admin", "Product Owner", "Mitarbeiter"],
  },
  addSprint: {
    roles: ["Admin", "Product Owner"],
  },
  deleteSprint: {
    roles: ["Admin", "Product Owner"],
  },
  updateSprint: {
    roles: ["Admin", "Product Owner"],
  },
  addStory: {
    roles: ["Admin", "Product Owner", "Mitarbeiter"],
  },
  deleteStory: {
    roles: ["Admin", "Product Owner", "Mitarbeiter"],
  },
  updateStory: {
    roles: ["Admin", "Product Owner", "Mitarbeiter"],
  },
};
export default userPermissions;
