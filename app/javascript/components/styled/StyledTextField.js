import { styled } from '@mui/system';
import { TextField } from '@mui/material';

const StyledTextField = styled(TextField, {
  name: 'StyledTextField',
})({
  width: 300,
  '& .MuiInputBase-root': {
    height: 35,
  },
});

export default StyledTextField;
