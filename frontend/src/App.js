import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import Login from "./UserAuth/Login";
import Signup from "./UserAuth/Signup";
import Dashboard from "./Pages/Dashboard";
import UserManagement from "./Pages/UserManagement/UserManagement";
import Kanban from "./Pages/Kanban";
import Project from "./Pages/Project";
import TeamsManagement from "./Pages/TeamsManagement/TeamsManagement";
import CreateTeam from "./Pages/TeamsManagement/CreateTeam";
import EditTeam from "./Pages/TeamsManagement/EditTeam";
import Projects from "./Pages/Projects";
import Profile from "./Pages/Profile";
import CreateSprint from "./Pages/CreateSprint";
import history from "./history";
import Sprint from "./Pages/Sprint";
import Sprints from "./Pages/Sprints";
import Alert from "./components/Alert";
import RequireAuth from "./hooks/requireAuth";
import RequireAdmin from "./hooks/requireAdmin";
import Burndown from "./Pages/Burndown";
import RequireOr from "./hooks/requireOr";

function App() {
  return (
    <div className="App">
      <Loading />
      <Alert />
      <Routes history={history}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/login/resetPassword/:token"
          element={<Login showReset={true} />}
        />
        <Route
          path="/login/verifyAccount/:token"
          element={<Login showVerify={true} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/userManagement"
          element={
            <RequireAuth>
              <RequireAdmin>
                <UserManagement />
              </RequireAdmin>
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/kanban"
          element={
            <RequireAuth>
              <Kanban />
            </RequireAuth>
          }
        />
        <Route
          path="/burndown"
          element={
            <RequireAuth>
              <Burndown />
            </RequireAuth>
          }
        />
        <Route
          path="/teamsManagement"
          element={
            <RequireAuth>
              <RequireAdmin>
                <TeamsManagement />
              </RequireAdmin>
            </RequireAuth>
          }
        />
        <Route
          path="/createTeam"
          element={
            <RequireAuth>
              <RequireAdmin>
                <CreateTeam />
              </RequireAdmin>
            </RequireAuth>
          }
        />
        <Route
          path="/teamsManagement/editTeam/:teamId"
          element={
            <RequireAuth>
              <RequireAdmin>
                <EditTeam />
              </RequireAdmin>
            </RequireAuth>
          }
        />

        <Route path="/project">
          <Route
            path=":projectId"
            element={
              <RequireAuth>
                <Project />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="/project/:projectId/createsprint"
          element={
            <RequireAuth>
              <RequireOr>
                <CreateSprint />
              </RequireOr>
            </RequireAuth>
          }
        />

        <Route
          path="/project/:projectId/sprints"
          element={
            <RequireAuth>
              <Sprints />
            </RequireAuth>
          }
        />
        <Route
          path="/project/:projectId/sprint/:sprintId"
          element={
            <RequireAuth>
              <Sprint />
            </RequireAuth>
          }
        />
        <Route
          path="/projects"
          element={
            <RequireAuth>
              <Projects />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <RequireAuth>
              <Navigate to="/dashboard" />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
