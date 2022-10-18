import { useState, useRef, useEffect } from 'react';
import './App.css';

import { Stack, Box,  Typography, Badge, Button, IconButton, Slider } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import useMediaQuery from '@mui/material/useMediaQuery';
import hexImg from './assets/hex-colors.png'


function App() {
  const mediumDevice = useMediaQuery('(min-width:720px)');
  const smallDevice = useMediaQuery('(min-width:540px)');
  const xtraSmallDevice = useMediaQuery('(min-width:405px)');

  const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
  const [amount, setAmount] = useState(4);
  const amountRef = useRef(amount);
  const [color, setColor] = useState("");
  const [streak, setStreak] = useState(0);
  const [squares, setSquares] = useState([]);
  const [help, setHelp] = useState(false);
  const [sure, setSure] = useState(false);

  const handleClick = () => {
    setStreak(prev => prev + 1)
    generateSquares();
  }

  const generateColor = () => {
    let newColor = ["#"];
    for (let i = 0; i < 6; i++) { newColor.push( hex[ Math.floor(Math.random()*16) ] ) }
    return newColor.join("");
  }

  const generateSquares = () => {
    let correctColor = generateColor();
    let newSquares = [correctColor];
    for (let i = 1; i < amountRef.current; i++) { newSquares.push(generateColor()); }
    setAmount(amountRef.current);
    setColor(correctColor);
    setSquares(newSquares.sort((a, b) => 0.5 - Math.random()));
  }

  useEffect(() => { generateSquares(); }, [])

  return (
    <Stack sx={{height:`${window.innerHeight}px`}} justifyContent="center" alignItems="center">
      <Box sx={{ background:"#fff", padding:"40px 0", width:!xtraSmallDevice ? "100%" : !smallDevice ? "100%" : !mediumDevice ? 540 : 660}}>
        <Box sx={{margin:"0 auto", justifyContent:"center", width:!xtraSmallDevice ? 260 : !smallDevice ? 340 : !mediumDevice ? 450 : 600}}>
        <Stack spacing={!smallDevice ? 2 : 4} direction={!smallDevice ? "column" : "rowd  "} justifyContent="space-around" alignItems="center">
              
              <Box sx={{width: 120}}>
                <Stack spacing={2} direction="row" alignItems="center"  justifyContent={!smallDevice ? "center" : null}>
                  <Typography variant="h6" component="h1" > {color} </Typography> 
                  <Badge badgeContent={streak} color="error"/>
                </Stack>
              </Box>

              <Box sx={{ width:!xtraSmallDevice ? 120 : !smallDevice ? 180 : mediumDevice ? 200 : 150 }}>
                <Slider defaultValue={4} valueLabelDisplay="auto"  min={2} max={12} onChange={(e) => amountRef.current = e.target.value}/>
              </Box>

              <Stack spacing={1} direction="row"  alignItems="center">
                <Button variant="contained" disableElevation onClick={() => streak ? setSure(true) : generateSquares()}>New</Button>
                <IconButton onClick={() => setHelp(true) }><HelpIcon/></IconButton>
              </Stack>

        </Stack>
        </Box>

      <ImageList sx={{
        width:!xtraSmallDevice ? 300 : !smallDevice ? 380 : !mediumDevice ? 450 : 550,
        height:!xtraSmallDevice ? 300 : !smallDevice ? 400 : !mediumDevice ? 450 : 550,
        marginTop:mediumDevice ? "40px" : "20px", marginInline:"auto"}} gap={0} variant="quilted"
        cols={amount % 2 === 0 && amount % 6 !== 0 ? 2 : 3}>
        {
          squares.map((e, i) => { return (
            <ImageListItem key={i} cols={1} rows={1}>
              <Box sx={{width:"100%", height:"100%", cursor:"pointer", backgroundColor: e}} onClick={() => e === color ? handleClick() : setStreak(0)}/>
            </ImageListItem>
          )})
        }
      </ImageList>

      <Dialog open={sure} onClose={() => setSure(false)} >
        <DialogTitle> {"Are you sure?"} </DialogTitle>
        <DialogContent>
          <DialogContentText>This action will reset your streak.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setSure(false); setStreak(0); generateSquares()}}>Yes</Button>
          <Button onClick={() => setSure(false)}>No</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={help} onClose={() => setHelp(false)} >
        <DialogTitle> {"How does hexadecimal color work?"} </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Hexadecimal uses sixteen distinct symbols, the symbols 0–9 to represent values zero to nine and A, B, C, D, E, F to represent values ten to fifteen. Using one hexadecimal character you can represent 16 values. With two hexadecimal you can represent 256 (16*16) values.
          <img src={hexImg} alt="hex-colors" style={{width:"100%", marginBlock:"20px"}}/>
          <br/>The first two letters/numbers of an hexadecimal color refer to the amount of red, the next two refer to the amount of green, and the last two refer to the amount of blue. The color values are defined in values between 00 and FF (instead of from 0 to 255 in RGB).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelp(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      </Box>
    </Stack>
  );
}

export default App;
