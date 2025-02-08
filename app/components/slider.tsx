import  {type  SliderProps } from '@mui/material/Slider';
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSlider = styled(Slider)<SliderProps>({
  height: 9,
  color: 'var(--color-green)',
  cursor: 'default',

  '& .MuiSlider-thumb': {
    height: 25,
    width: 25,
    margin:'0px 0px 0px 8px',
    backgroundColor: 'var(--color-gray-800)',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 0px `,
    },
  },
  '& .MuiSlider-rail': {
    backgroundColor: 'var(--color-gray-500)',
  },
});

export default StyledSlider;