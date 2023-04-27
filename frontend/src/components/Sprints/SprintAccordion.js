import React from "react";
import { useValue } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import DeleteModal from "../DeleteModal";
import { useNavigate } from "react-router-dom";
import { getSprintsByProject } from "../../actions/sprint";
import Box from "@mui/material/Box";
import MoveStories from "./MoveStories";
import Tooltip from "@mui/material/Tooltip";

export default function SprintAccordion(props) {
  let { projectId } = useParams();
  const number = props.number;
  const row = props.row;
  const Navigate = useNavigate();

  const {
    state: { currentUser, sprints },
    dispatch,
  } = useValue();

  const [expanded, setExpanded] = React.useState("panel1");
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showMoveModal, setShowMoveModal] = React.useState(false);
  const [SprintToDelete, setSprintToDelete] = React.useState(null);
  const [sprintToMove, setSprintToMove] = React.useState(null);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        close={() => {
          setShowDeleteModal(false);
        }}
        submitdelete={() => {
          setShowDeleteModal(false);
          setTimeout(() => {
            getSprintsByProject(dispatch, projectId, currentUser);
            dispatch({
              type: "UPDATE_SPRINTS",
              payload: sprints,
            });
          }, 300);
        }}
        id={SprintToDelete?.id}
        dispatch={props.dispatch}
        type="sprint"
        currentUser={props.currentUser}
        message={`Wollen Sie den Sprint "${SprintToDelete?.sprintTitle}" wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden!`}
      />
      <MoveStories
        showMoveModal={showMoveModal}
        sprintId={sprintToMove}
        close={() => {
          setShowMoveModal(false);
        }}
        submit={() => {
          setShowMoveModal(false);
          setTimeout(() => {
            getSprintsByProject(dispatch, projectId, currentUser);
            dispatch({
              type: "UPDATE_SPRINTS",
              payload: sprints,
            });
          }, 300);
        }}
      />

      <Accordion
        expanded={expanded === `panel${number}`}
        onChange={handleChange(`panel${number}`)}
        sx={{ bgcolor: "secondary.main", color: "text.default" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${number}bh-content`}
          id={`panel${number}bh-header`}
        >
          <Typography sx={{ fontSize: 16, fontWeight: "bold", flexShrink: 0 }}>
            {number === 1
              ? "Aktive Sprints"
              : number === 2
              ? "Geplante Sprints"
              : "Vergangene Sprints"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {row?.length !== 0 ? (
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{ backgroundColor: "background.secondary" }}
                    key={1}
                  >
                    <TableCell
                      sx={{ fontWeight: "bold", color: "text.default" }}
                    >
                      Sprint-Titel
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", color: "text.default" }}
                    >
                      Sprint-Datum
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        backgroundColor: "background.secondary",
                        transition: "background 0.2s",

                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                        "&:hover": {
                          transition: "background 0.2s",
                          backgroundColor: "background.default",
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={() => {
                          Navigate(
                            "/project/" + projectId + "/sprint/" + row.id
                          );
                        }}
                        sx={{
                          color: "text.default",

                          cursor: "pointer",
                          width: "55%",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography noWrap>
                            {row.sprintTitle}
                            {row.moved ? " (archiviert)" : ""}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "text.default" }}>
                        {row.date}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mr: 3,
                        }}
                      >
                        {props.showButtons &&
                        props.number === 3 &&
                        !row.moved ? (
                          <Tooltip title="Verbleibende Stories vorhanden">
                            <IconButton
                              variant="default"
                              sx={{
                                transition: "background 0.2s",

                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                                "&:hover": {
                                  transition: "background 0.2s",
                                  backgroundColor: "secondary.main",
                                },
                              }}
                              onClick={() => {
                                setSprintToMove(row?.id);
                                setShowMoveModal(true);
                              }}
                            >
                              <WarningIcon sx={{ color: "#E64969" }} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {props.showButtons && props.number !== 1 ? (
                          <IconButton
                            variant="default"
                            sx={{
                              transition: "background 0.2s",

                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                              "&:hover": {
                                transition: "background 0.2s",
                                backgroundColor: "secondary.main",
                              },
                            }}
                            onClick={() => {
                              setSprintToDelete(row);
                              setShowDeleteModal(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>
              Kein{" "}
              {number === 1
                ? "aktiver "
                : number === 2
                ? "geplanter "
                : "vergangener "}
              Sprint verfügbar
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
