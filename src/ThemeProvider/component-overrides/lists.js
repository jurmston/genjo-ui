export function createListOverrides({ palette }) {
  const MuiList = {
    defaultProps: {
      disablePadding: true,
    },
  }

  const MuiListItem = {
    styleOverrides: {
      root: {
        paddingTop: 6,
        paddingBottom: 6,
        minHeight: 0,
      },
    },
  }

  const MuiMenuItem = {
    styleOverrides: {
      root: {
        paddingTop: 6,
        paddingBottom: 6,
        minHeight: 0,
      },
    },
  }

  const MuiListItemAvatar = {
    styleOverrides: {
      root: {
        minWidth: 40,
      },
    },
  }

  const MuiListItemIcon = {
    styleOverrides: {
      root: {
        minWidth: 32,
      },
    },
  }

  const MuiListItemText = {
    styleOverrides: {
      root: {
        margin: 0,
        lineHeight: 1.12,
      },
      multiline: {
        margin: 0,
        marginTop: 0,
        marginBottom: 0,
      },

      inset: {
        paddingLeft: 32,
      }
    },
  }

  const MuiListSubheader = {
    defaultProps: {
      disableSticky: true,
    },

    styleOverrides: {
      root: {
        color: palette.grey[500],
      },
    },
  }

  return {
    MuiListItem,
    MuiListItemAvatar,
    MuiListItemIcon,
    MuiListItemText,
    MuiListSubheader,
    MuiMenuItem,
    MuiList,
  }
}