import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({
  open,
  onClose,
  content,
  title,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  content: any;
  title: string;
  actions?: any;
}) => (
  <Dialog open={open} fullWidth onClose={onClose}>
    <DialogTitle id="id">
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </DialogTitle>
    <DialogContent>{content}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
);

export default Modal;
