import React from 'react';
import { Box, Container, Typography, Stack, Link, Divider } from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: 'background.paper',
      borderTop: '1px solid',
      borderColor: 'divider',
      mt: 'auto',
    }}
  >
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 0 }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          sx={{ mb: 4 }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 0.5,
                color: 'primary.main',
              }}
            >
              Fit-Track
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: '280px',
              }}
            >
              Simple workout tracking for consistent progress.
            </Typography>
          </Box>

          {/* Links */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: 'text.primary',
                }}
              >
                Product
              </Typography>
              <Stack spacing={1}>
                <Link
                  href="#features"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  Features
                </Link>
                <Link
                  href="#track-your-progress"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  Track your progress
                </Link>
                {/* <Link
                  href="#testimonials"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  Testimonials
                </Link> */}
              </Stack>
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: 'text.primary',
                }}
              >
                Support
              </Typography>
              <Stack spacing={1}>
                <Link
                  href="https://github.com/narainkarthikv/fit-track"
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  Documentation
                </Link>
                <Link
                  href="https://github.com/narainkarthikv/fit-track/issues"
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  Report Issue
                </Link>
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Bottom */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            © {new Date().getFullYear()} Fit-Track. Open source and free to use.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link
              href="https://github.com/narainkarthikv/fit-track"
              target="_blank"
              rel="noopener"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <GitHub fontSize="small" />
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Container>
  </Box>
);

export default Footer;
