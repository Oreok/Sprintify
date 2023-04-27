import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import Groups2Icon from "@mui/icons-material/Groups2";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

export const menuItems = [
  {
    name: "Allgemein",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon />,
      },
      {
        title: "Projekte",
        icon: <LayersIcon />,
        hasChildren: true,
        children: "project",
      },
    ],
  },
  {
    name: "Tools",
    items: [
      {
        title: "Kanbanboard",
        path: "/kanban",
        icon: <DateRangeIcon />,
      },
      {
        title: "Burndown-Chart",
        path: "/burndown",
        icon: <SsidChartIcon />,
      },
    ],
  },
  {
    name: "Verwaltung",
    items: [
      {
        title: "Benutzer",
        path: "/userManagement",
        icon: <SupervisedUserCircleIcon />,
      },
      {
        title: "Teams",
        path: "/teamsManagement",
        icon: <Groups2Icon />,
      },
    ],
  },
];
