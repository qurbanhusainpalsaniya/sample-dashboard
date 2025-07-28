'use client';

import { Box, Button, Container } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function Page() {
    return (
        <Box
            sx={{
                bgcolor: 'primary.light',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container>
                <Box
                    sx={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: 'primary.contrastText', // Optional for better text contrast
                    }}
                >
                    <Link href="/dashboard/home" passHref legacyBehavior>
                        <Button variant="contained" color="primary">
                            Go to Dashboard
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}
