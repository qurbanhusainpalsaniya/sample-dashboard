import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import Label from 'components/label';
import Iconify from 'components/iconify';
import Scrollbar from 'components/scrollbar';
import { TableHeadCustom } from 'components/table';
import CustomPopover, { usePopover } from 'components/custom-popover';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

const CUSTOMER_DATA = [
  {
    id: 'CUST001',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/assets/avatar/avatar_1.jpg',
    status: 'active',
  },
  {
    id: 'CUST002',
    name: 'Ayesha Khan',
    email: 'ayesha@example.com',
    avatar: '/assets/avatar/avatar_2.jpg',
    status: 'inactive',
  },
  {
    id: 'CUST003',
    name: 'Raj Verma',
    email: 'raj@example.com',
    avatar: '/assets/avatar/avatar_3.jpg',
    status: 'pending',
  },
  {
    id: 'CUST004',
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    avatar: '/assets/avatar/avatar_4.jpg',
    status: 'active',
  },
  {
    id: 'CUST005',
    name: 'Aman Gill',
    email: 'aman@example.com',
    avatar: '/assets/avatar/avatar_5.jpg',
    status: 'active',
  },
  {
    id: 'CUST006',
    name: 'Fatima Sheikh',
    email: 'fatima@example.com',
    avatar: '/assets/avatar/avatar_6.jpg',
    status: 'inactive',
  },
  {
    id: 'CUST007',
    name: 'Vikram Rana',
    email: 'vikram@example.com',
    avatar: '/assets/avatar/avatar_7.jpg',
    status: 'pending',
  },
  {
    id: 'CUST008',
    name: 'Vikram Rana',
    email: 'vikram@example.com',
    avatar: '/assets/avatar/avatar_7.jpg',
    status: 'pending',
  },
  {
    id: 'CUST009',
    name: 'Vikram Rana',
    email: 'vikram@example.com',
    avatar: '/assets/avatar/avatar_7.jpg',
    status: 'pending',
  },

];


const CUSTOMER_LABELS = [
  { id: 'name', label: 'Customer' },
  { id: 'email', label: 'Email' },
  { id: 'status', label: 'Status' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function AppCustomerList({ title = "Customer List" }) {
  return (
    <Card sx={{ height: 680 }}>
      <CardHeader title={title} sx={{ mb: 0 }} />
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={CUSTOMER_LABELS} />

            <TableBody>
              {CUSTOMER_DATA.map((row) => (
                <AppCustomerRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

AppCustomerList.propTypes = {
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function AppCustomerRow({ row }) {
  const popover = usePopover();

  const handleMessage = () => {
    popover.onClose();
    console.info('MESSAGE', row.id);
  };

  const handleCall = () => {
    popover.onClose();
    console.info('CALL', row.id);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row.id);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={row.avatar} alt={row.name} sx={{ mr: 2 }} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'inactive' && 'warning') ||
              (row.status === 'pending' && 'info') ||
              'success'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleMessage}>
          <Iconify icon="mdi:message-text-outline" />
          Message
        </MenuItem>

        <MenuItem onClick={handleCall}>
          <Iconify icon="mdi:phone-outline" />
          Call
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

AppCustomerRow.propTypes = {
  row: PropTypes.object,
};
