const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };
    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };
    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };
    case "UPDATE_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER_INFO":
      return { ...state, user: action.payload };
    case "UPDATE_STORIES":
      return { ...state, stories: action.payload };
    case "UPDATE_SPRINT":
      return { ...state, sprint: action.payload };
    case "UPDATE_SPRINTS":
      return { ...state, sprints: action.payload };
    case "UPDATE_PROJECT":
      return { ...state, project: action.payload };
    case "UPDATE_PROJECTS":
      return { ...state, projects: action.payload };
    case "UPDATE_NAV_PROJECTS":
      return { ...state, navProjects: action.payload };
    case "UPDATE_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    case "UPDATE_PRODUCT_OWNERS":
      return { ...state, productOwners: action.payload };
    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };
    case "UPDATE_TEAM":
      return { ...state, team: action.payload };
    case "UPDATE_TEAMS":
      return { ...state, teams: action.payload };
    case "UPDATE_SPRINT_STATS":
      return { ...state, sprintStats: action.payload };
    case "UPDATE_ACTIVE_SPRINT":
      return { ...state, activeSprint: action.payload };
    case "UPDATE_PROJECT_STATS":
      return { ...state, projectStats: action.payload };
    case "UPDATE_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "UPDATE_IMAGE":
      return { ...state, image: action.payload };

    default:
      throw new Error("No matched action!");
  }
};
export default reducer;
