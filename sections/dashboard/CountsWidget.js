import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { fShortenNumber } from 'utils/format-number';

import { bgGradient } from 'theme/css';
import GoogleMaterialIcon from 'components/google-icon';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function CountsWidget({
  title,
  total,
  name,
  icon,
  description,
  path,
  color = 'primary',
  sx,
  ...other
}) {

  const content = (
    <Stack
      alignItems="start"
      sx={{
        cursor: path ? 'pointer' : 'default',
        ...bgGradient({
          direction: '135deg',
          // startColor: alpha(theme.palette[color].light, 0.2),
          // endColor: alpha(theme.palette[color].main, 0.2),
        }),
        p: 2,
        borderRadius: 2,
        textAlign: 'start',
        color: `black`,
        height: 160,
        backgroundColor: 'white',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: path ? 'scale(1.02)' : 'none',
          boxShadow: path ? 3 : 'none',
        },
        ...sx,
      }}
      {...other}
    >
      {/* {icon && (
        <Box>
          <GoogleMaterialIcon icon={icon} customSize="45px" filled />
        </Box>
      )} */}
      <Typography variant="subtitle1">{title}</Typography>

      <Typography mt={2} color='primary.main' variant="h3">{name}</Typography>

      <Typography color='primary.main' variant="body1">
        {description}
      </Typography>
    </Stack>
  );

  return (
    <Link href={path} passHref legacyBehavior>{content}</Link>
  );
}

CountsWidget.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
};
