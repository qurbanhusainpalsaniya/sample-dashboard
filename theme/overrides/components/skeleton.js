// ----------------------------------------------------------------------

export function skeleton(theme) {
    return {
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.background.dialog,
                },
                rounded: {
                    borderRadius: theme.shape.borderRadius * 2,
                },
            },
        },
    };
}
