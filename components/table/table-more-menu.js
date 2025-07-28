import { LoadingButton } from '@mui/lab';
import { Button, IconButton } from '@mui/material';
import CustomPopover from 'components/custom-popover/custom-popover';
import GoogleMaterialIcon from 'components/google-icon';
import { t } from 'i18next';
import PropTypes from 'prop-types';

TableMoreMenu.propTypes = {
  actions: PropTypes.node,
  open: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

export default function TableMoreMenu({ actions, open, onClose, onOpen, showButton = false, loading = false, isDisable = false }) {
  return (
    <>
      {showButton
        ? <LoadingButton disabled={isDisable} loading={loading} size='small' variant='text' color='primary' onClick={(e) => { e.stopPropagation(); onOpen(e); }}>{t('change')}</LoadingButton>
        : <IconButton onClick={(e) => { e.stopPropagation(); onOpen(e); }}><GoogleMaterialIcon icon={'more_vert'}  /></IconButton>
      }
      <CustomPopover open={open} onClose={onClose} arrow="right-top"
        sx={{
          "& .MuiMenuItem-root": {
            marginBottom: '0 !important'
          },
          "& .MuiMenuItem-root .googleIcon": {
            marginRight: 1
          }
        }}
      >
        {actions}
      </CustomPopover>
    </>
  );
}
