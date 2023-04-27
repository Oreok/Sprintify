import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { duration, styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import "dayjs/locale/de";
import TextField from "@mui/material/TextField";
import { useValue } from "../../context/ContextProvider";

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    width: "12.5%",
    borderRadius: 0,
    backgroundColor:
      localStorage.getItem("theme") === "dark" ? "#192734" : "#d3d3d3",
    color: "black",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

export default function Date(props) {
  var startValue = props.startValue;
  var endValue = props.endValue;
  var setStartValue = props.setStartValue;
  var setEndValue = props.setEndValue;
  var sprints = props.sprints;
  var setShowButton = props.setShowButton;

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  React.useEffect(() => {
    checkDate();
  }, [sprints, startValue, endValue]);

  const handleAlert = (open, severity, message, duration) => {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: open,
        severity: severity,
        message: message,
        duration: duration,
      },
    });
  };

  const checkDateFormat = (startDate, endDate) => {
    if (!dayjs(startDate?.$d).isValid() || !dayjs(endDate?.$d).isValid()) {
      setShowButton(true);
      handleAlert(true, "warning", "Ungültiges Datum Format!");
    }
  };

  const checkDate = () => {
    if (sprints === null) return;
    let isTaken = false;

    sprints.map((sprint) => {
      if (sprint?._id !== props.currentSprint?._id) {
        if (isTaken) return;

        if (
          dayjs(sprint.sprintStartDate).isBefore(dayjs(endValue)) &&
          dayjs(startValue).isBefore(dayjs(sprint.sprintEndDate))
        ) {
          isTaken = true;
          setShowButton(true);
          handleAlert(
            true,
            "warning",
            "Dieser Zeitraum wird schon verwendet!",
            null
          );
        } else if (dayjs(startValue).isAfter(dayjs(endValue))) {
          isTaken = true;
          setShowButton(true);
          handleAlert(
            true,
            "warning",
            "Das Startdatum muss vor dem Enddatum liegen!",
            null
          );
        } else {
          setShowButton(false);
          handleAlert(false, "warning", "");
        }
      }
    });

    checkDateFormat(startValue, endValue);
  };

  const renderExistingSprint = (
    date,
    selectedDates,
    pickersDayProps,
    sprints
  ) => {
    if (!sprints || sprints.length === 0) {
      return <PickersDay {...pickersDayProps} />;
    }

    const sprint = sprints.find((s) =>
      date.isBetween(
        dayjs(s.sprintStartDate).subtract(1, "day"),
        dayjs(s.sprintEndDate),
        null,
        "[]"
      )
    );
    if (!sprint) {
      return <PickersDay {...pickersDayProps} />;
    }
    if (sprint?._id === props.currentSprint?._id) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = dayjs(sprint.sprintStartDate).subtract(1, "day");
    const end = dayjs(sprint.sprintEndDate);
    const dayIsBetween = date.isBetween(start, end, null, "[]");
    const isFirstDay = date.subtract(1, "day").isSame(start, "day");
    const isLastDay = date.isSame(end, "day");
    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        disabled
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"de"}>
      <DatePicker
        PaperProps={{
          sx: {
            svg: { color: "text.default" },
            span: { color: "text.default" },
            color: "text.default",
          },
        }}
        PopperProps={{
          sx: {
            "& .MuiPickersDay-root": {
              color: "text.default",
              "&:hover": {
                backgroundColor: "background.default",
              },
            },
            "& .MuiButtonBase-root.MuiPickersDay-root.Mui-disabled": {
              color: "#7a7a7a",
            },
          },
        }}
        label="Start Datum"
        value={startValue}
        inputFormat="DD.MM.YYYY"
        disablePast
        onChange={(newValue) => {
          setStartValue(newValue);
        }}
        renderDay={(date, selectedDates, pickersDayProps) =>
          renderExistingSprint(date, selectedDates, pickersDayProps, sprints)
        }
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        PaperProps={{
          sx: {
            svg: { color: "text.default" },
            span: { color: "text.default" },
            color: "text.default",
          },
        }}
        PopperProps={{
          sx: {
            "& .MuiPickersDay-root": {
              color: "text.default",
              "&:hover": {
                backgroundColor: "background.default",
              },
            },
            "& .MuiButtonBase-root.MuiPickersDay-root.Mui-disabled": {
              color: "#7a7a7a",
            },
          },
        }}
        label="End Datum"
        value={endValue}
        inputFormat="DD.MM.YYYY"
        minDate={dayjs(startValue)}
        onChange={(newValue) => {
          setEndValue(newValue);
        }}
        renderDay={(date, selectedDates, pickersDayProps) =>
          renderExistingSprint(date, selectedDates, pickersDayProps, sprints)
        }
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
