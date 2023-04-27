import { createTheme } from "@mui/material/styles";
import { deDE } from "@mui/x-data-grid";
import { deDE as pickersDeDE } from "@mui/x-date-pickers";
import { deDE as coreDeDE } from "@mui/material/locale";

export const themeLight = createTheme(
  {
    palette: {
      primary1: { main: "#2c9dd3", contrastText: "#fff" },
      secondary: { main: "#f2f2f2", contrastText: "#fff" },
      secondary2: { main: "#4c5888", contrastText: "#fff" },
      secondary3: { main: "#374D5A", contrastText: "#fff" },
      primary3: { main: "#4C96BA", contrastText: "#fff" },
      primary2: { main: "#017678", contrastText: "#fff" },
      default: "#fff",
      background: {
        //paper: "#4C96BA",
        paper: "#fff",
        default: "#F4F7FC",
        secondary: "#fff",
        third: "#f2f2f2",
        hover: "#d9d9d9",
      },
      text: {
        default: "#000",
        secondary: "#4c4c4c",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#6b6b6b transparent",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              color: "#192734",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#d3d3d3",
              border: "3px solid #ffff",
            },
            "& *::-webkit-scrollbar-corner": {
              background: "transparent",
            },
          },
        },
      },
      MuiLink: {
        variants: [
          {
            props: { variant: "default-link" },
            style: {
              textDecoration: "none",
              color: "primary3",
              cursor: "pointer",
            },
          },
        ],
      },

      MuiButton: {
        variants: [
          {
            props: { variant: "login-button" },

            style: {
              borderRadius: 7,
              color: "#fff",
              backgroundColor: "#374D5A",
              padding: "6px 12px",
              border: "solid 1px",
              borderColor: "#fff",
              fontSize: 14,
              "&:hover": {
                background: "#212e36",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
              "&.Mui-disabled": {
                background: "#eaeaea",
                color: "#c0c0c0",
              },
            },
          },
          {
            props: { variant: "card-button" },
            style: {
              borderRadius: 6,
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#374D5A",
              padding: "6px 10px",
              fontSize: 13.5,
              "&:hover": {
                background: "#212e36",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
            },
          },
          {
            props: { variant: "create-button" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#374D5A",
              padding: "6px 12px",
              border: "solid 1px",
              borderColor: "transparent",
              fontSize: 14,
              "&:hover": {
                background: "#212e36",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
              "&.Mui-disabled": {
                background: "#eaeaea",
                color: "#c0c0c0",
              },
            },
          },
          {
            props: { variant: "delete-button" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#ffffff",
              backgroundColor: "#ff4e49",
              padding: "6px 12px",
              border: "solid 1px",
              borderColor: "transparent",
              fontSize: 14,
              "&:hover": {
                background: "#ff2018",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
              "&.Mui-disabled": {
                background: "#eaeaea",
                color: "#c0c0c0",
              },
            },
          },
          {
            props: { variant: "remove-button" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#f8564e",
              backgroundColor: "#374D5A",
              padding: "6px 12px",
              border: "solid 1px",
              borderColor: "transparent",
              fontSize: 14,
              "&:hover": {
                background: "#212e36",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
              "&.Mui-disabled": {
                background: "#eaeaea",
                color: "#c0c0c0",
              },
            },
          },
          {
            props: { variant: "create-button-secondary" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#374D5A",
              border: "solid 1px",
              borderColor: "transparent",
              backgroundColor: "#fff",

              padding: "6px 12px",
              fontSize: 14,
              "&:hover": {
                border: "solid 1px",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
            },
          },
          {
            props: { variant: "sidebar-button" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#c0c0c0",
              border: "solid 1px",
              borderColor: "transparent",
              cursor: "pointer",
              padding: "6px 12px",
              fontSize: 14,
              "&:hover": {
                border: "solid 1px",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
            },
          },
        ],
      },
      MuiPaper: {
        variants: [
          {
            props: { variant: "card-white" },
            style: {
              backgroundColor: "#fff",
            },
          },
        ],
      },
      MuiIconButton: {
        variants: [
          {
            props: { variant: "card-icon-button" },
            style: {
              color: "#374D5A",
            },
          },
        ],
      },
    },
  },
  deDE, // x-data-grid translations
  pickersDeDE, // x-date-pickers translations
  coreDeDE // core translations
);

export const themeDark = createTheme(
  {
    palette: {
      primary1: { main: "#fffff", contrastText: "#B8B2A9" },
      secondary: { main: "#22303C", contrastText: "#B8B2A9" },
      secondary2: { main: "#4c5888", contrastText: "#fff" },
      secondary3: { main: "#8899A6", contrastText: "#fff" },
      primary3: { main: "#B8B2A9", contrastText: "#B8B2A9" },
      primary2: { main: "#80babb", contrastText: "#fff" },
      default: "#B0B3B8",
      background: {
        paper: "#22303C",
        default: "#15202B",
        secondary: "#192734",
        third: "#242526",
        hover: "#0f1010",
      },
      text: {
        default: "#F6F9F9",
        secondary: "#B8B2A9",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#6b6b6b transparent",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "#192734",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#6b6b6b",
              border: "3px solid #192734",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6c6c6c",
              transition: "border-color 0.4s",
            },
            "& .MuiOutlinedInput-input": {
              color: "#F6F9F9",
              "&.Mui-disabled": {
                WebkitTextFillColor: "#6c6c6c",
              },
            },
            "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#6c6c6c",
              },
            "& .MuiInputLabel-outlined": {
              color: "#F6F9F9",
              "&.Mui-disabled": {
                color: "#6c6c6c",
              },
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1DA1F2",
              transition: "border-color 0.4s",
            },
            "& .MuiSelect-icon": {
              color: "#F6F9F9",
            },
            "& .MuiMenu-list": {
              backgroundColor: "#15202B",
              color: "#F6F9F9",
            },
            "& .MuiInputAdornment-root": {
              color: "#F6F9F9",
            },
            //style color set white for .css-gdh49b-MuiAutocomplete-listbox
            "& .MuiAutocomplete-paper": {
              color: "#F6F9F9",
              backgroundColor: "#15202B",
            },
            "& *::-webkit-scrollbar-corner": {
              background: "transparent",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          style: {
            borderColor: "red",
            color: "#fff",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            color: "#F6F9F9",
            "& .MuiButtonBase-root": {
              color: "#EEEFEF",
            },
            "& .MuiDataGrid-colCellTitleContainer": {
              color: "#F6F9F9",
            },
            "& .MuiTablePagination-displayedRows": {
              color: "#F6F9F9",
            },
            "& .MuiMenuItem-root": {
              bgcolor: "#F6F9F9",
            },
            borderColor: "#6c6c6c",
            "& .MuiDataGrid-columnHeaders": {
              borderColor: "#6c6c6c",
            },
            "& .MuiDataGrid-cell": {
              borderColor: "#6c6c6c",
            },
            "& .MuiDataGrid-footerContainer": {
              borderColor: "#6c6c6c",
            },
            "& .Mui-disabled": {
              color: "#adadad",
            },
            "& .MuiInputBase-input": {
              color: "#F6F9F9",
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "#6c6c6c",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#F6F9F9",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "#6c6c6c",
            },
            "& .MuiInputBase-root": {
              color: "#F6F9F9",
            },
            "& .MuiDataGrid-booleanCell[data-value='false']": {
              color: "#F6F9F9",
            },
            "& .MuiDataGrid-booleanCell[data-value='true']": {
              color: "#F6F9F9",
            },
            "& .MuiAutocomplete-listbox": {
              color: "#F6F9F9",
            },
          },
        },
      },

      MuiIconButton: {
        variants: [
          {
            props: { variant: "default" },
            style: {
              color: "#ffff",
              "&.Mui-disabled": {
                color: "#adadad",
              },
            },
          },
          {
            props: { variant: "card-icon-button" },
            style: {
              color: "#F6F9F9",
            },
          },
        ],
      },
      MuiSelect: {
        variants: [
          {
            props: { variant: "outlined" },
            style: {
              color: "#fff",
              borderColor: "#fff",
              "&.Mui-disabled": {
                color: "#adadad",
              },
            },
          },
        ],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "card-button" },
            style: {
              borderRadius: 6,
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#374D5A",
              padding: "6px 10px",
              fontSize: 13.5,
              "&:hover": {
                background: "#212e36",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
            },
          },
          {
            props: { variant: "create-button" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#374D5A",
              padding: "6px 12px",
              border: "solid 1px",
              borderColor: "transparent",
              fontSize: 14,
              "&:hover": {
                background: "#212e36",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
              "&.Mui-disabled": {
                background: "#737373",
                color: "#393939",
              },
            },
          },
          {
            props: { variant: "delete-button" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#ffffff",
              backgroundColor: "#ff4e49",
              padding: "6px 12px",
              border: "solid 1px",
              borderColor: "transparent",
              fontSize: 14,
              "&:hover": {
                background: "#ff2018",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
              "&.Mui-disabled": {
                background: "#737373",
                color: "#393939",
              },
            },
          },
          {
            props: { variant: "remove-button" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#f8564e",
              backgroundColor: "#374D5A",
              padding: "6px 12px",
              border: "solid 1px",
              borderColor: "transparent",
              fontSize: 14,
              "&:hover": {
                background: "#212e36",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
              "&.Mui-disabled": {
                background: "#737373",
                color: "#393939",
              },
            },
          },
          {
            props: { variant: "create-button-secondary" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#374D5A",
              border: "solid 1px",
              borderColor: "transparent",
              backgroundColor: "#d3d3d3",

              padding: "6px 12px",
              fontSize: 14,
              "&:hover": {
                backgroundColor: "#a0a0a0",
                border: "solid 1px",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
            },
          },
          {
            props: { variant: "sidebar-button" },
            style: {
              borderRadius: 7,
              textTransform: "none",
              color: "#c0c0c0",
              border: "solid 1px",
              borderColor: "transparent",
              cursor: "pointer",
              padding: "6px 12px",
              fontSize: 14,
              "&:hover": {
                border: "solid 1px",
                boxShadow: "5px 5px 21px -11px rgba(0,0,0,0.82)",
              },
            },
          },
        ],
      },
      MuiPaper: {
        variants: [
          {
            props: { variant: "card-white" },
            style: {
              backgroundColor: "#22303C",
              color: "#F6F9F9",
            },
          },
        ],
      },
    },
  },
  deDE, // x-data-grid translations
  pickersDeDE, // x-date-pickers translations
  coreDeDE // core translations
);
