import { useEffect, useState } from "react";
import { useValue } from "../context/ContextProvider";
import Box from "@mui/material/Box";
import Layout from "../layout";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import BreadCrumbBar from "../components/BreadCrumbBar";
import FormControl from "@mui/material/FormControl";
import useAuth from "../hooks/useAuth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getAllProjects, getProjectsByTeam } from "../actions/project";
import {
  getActiveSprintByProject,
  getSprintsByProject,
} from "../actions/sprint";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Burndown() {
  const theme = localStorage.getItem("theme");
  const { auth } = useAuth();

  const {
    state: { currentUser, projects, activeSprint, sprints },
    dispatch,
  } = useValue();

  const cachedProject = JSON.parse(localStorage.getItem("selectedProject"));
  const [selectedProject, setSelectedProject] = useState(
    cachedProject === undefined || cachedProject === null ? "" : cachedProject
  );

  const [showData, setShowData] = useState(true);
  const [lables, setLables] = useState([]);
  const [idealData, setIdealData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    if (currentUser !== null) {
      if (currentUser?.team !== null) {
        getProjectsByTeam(dispatch, currentUser);
      } else if (auth.admin) {
        getAllProjects(dispatch, currentUser);
      }
      if (selectedProject !== "") {
        getSprintsByProject(dispatch, selectedProject, currentUser);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeSprint !== null) {
      const data = activeSprint[0]?.sprintStats;

      if (data === undefined) {
        setShowData(false);
        return;
      }
      setShowData(true);
      let totalPoints = data.stats?.allStorypoints;
      let totalPoints2 = data.stats?.allStorypoints;

      const chartData = {
        labels: ["Start"],
        dataSetIdeal: [totalPoints],
        dataSetCurrent: [totalPoints],
      };

      for (let i = 0; i < data.dates.length; i++) {
        chartData.labels.push(dayjs(data.dates[i].date).format("DD.MM"));
        totalPoints = totalPoints - data.dates[i].storyPointsIdeal;
        chartData.dataSetIdeal.push(Math.round(totalPoints));

        totalPoints2 = totalPoints2 - data.dates[i].storyPoints;
        chartData.dataSetCurrent.push(Math.round(totalPoints2));
      }

      const startDay = dayjs(activeSprint[0]?.sprintStartDate).format(
        "DD.MM.YYYY"
      );

      const sprintDuration = dayjs().diff(dayjs(startDay, "DD.MM.YYYY"), "day");

      chartData.dataSetCurrent = chartData.dataSetCurrent.splice(
        0,
        sprintDuration + 2
      );

      setLables(chartData.labels);
      setIdealData(chartData.dataSetIdeal);
      setCurrentData(chartData.dataSetCurrent);
    }
  }, [activeSprint]);

  useEffect(() => {
    if (selectedProject !== "" && selectedProject !== undefined) {
      getActiveSprintByProject(dispatch, selectedProject);
      localStorage.setItem("selectedProject", JSON.stringify(selectedProject));
    }
  }, [selectedProject]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme === "dark" ? "#F6F9F9" : "#000",
        },
      },
      title: {
        display: true,
      },
    },
    //make the scales white
    scales: {
      x: {
        title: {
          display: true,
          text: "Zeitraum",
          font: {
            size: 15,
          },
          color: theme === "dark" ? "#F6F9F9" : "#000",
        },
        ticks: {
          color: theme === "dark" ? "#F6F9F9" : "#000",
        },
      },
      y: {
        title: {
          display: true,
          text: "Storypoints",
          font: {
            size: 15,
          },
          color: theme === "dark" ? "#F6F9F9" : "#000",
        },
        ticks: {
          color: theme === "dark" ? "#F6F9F9" : "#000",
        },
      },
    },
  };

  const chartdata = {
    labels: lables,
    datasets: [
      {
        label: "Ideal",
        data: idealData,

        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132, 0.7)",
      },
      {
        label: "Aktuell",
        data: currentData,

        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235, 0.7)",
      },
    ],
  };

  const breadCrumbInfo = [
    { name: "Dashboard", link: "/dashboard/" },
    { name: "Burndown-Chart" },
  ];

  return (
    <Layout
      inhalt={
        <>
          <BreadCrumbBar
            breadCrumbInfo={breadCrumbInfo}
            backButtonLink={"/dashboard/"}
            //loading={loading}
          />
          <Box
            sx={{
              bgcolor: "background.secondary",
              color: "text.default",
              mx: "5%",
              mb: 5,
              p: 2,
              borderRadius: "10px",
              width: "90%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              display="flex"
              sx={{ alignItems: "center", justifyContent: "flex-start", mb: 2 }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", pl: 2, mr: 2 }}
              >
                Burndown-Chart
              </Typography>
              <FormControl sx={{ width: 220, ml: 2 }} size="small">
                <InputLabel id="project-select-label">Projekt</InputLabel>
                <Select
                  labelId="project-select-label"
                  id="project-select"
                  value={selectedProject}
                  label="Projekt"
                  onChange={(event) => {
                    setSelectedProject(event.target.value);
                  }}
                >
                  {projects.map((project) => (
                    <MenuItem value={project?._id} key={project?._id}>
                      {project?.projectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              {showData === false ? (
                <Typography variant="h6" gutterBottom>
                  Keine Daten verfügbar
                </Typography>
              ) : (
                <Line options={options} data={chartdata} />
              )}
            </Box>
          </Box>
        </>
      }
    />
  );
}
