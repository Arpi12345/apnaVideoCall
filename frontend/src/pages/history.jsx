import React, {useEffect, useState,useContext} from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function History() {
    const { getHistoryOfUser} = useContext(AuthContext);
    const[meetings,  setMeetings] = useState([])
    const routeTo = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
   
    useEffect(() =>{
        const fetchHistory = async() =>{
            try{
            const history = await getHistoryOfUser();
            setMeetings(history || []);

            }catch(err){
                console.error(err);
                setSnackbarMsg("Failed to load history");
                setOpenSnackbar(true);

            }
        }
        fetchHistory();

    },[ getHistoryOfUser]);
    
    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }


  return (
    <div>
        <IconButton onClick={() =>{
            routeTo("/home")
        }} >
       <HomeIcon/>
        </IconButton>
  {meetings?.length > 0 ? (
  meetings.map((e, i) => (
    <Card key={i} variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
      <Typography
  sx={{ cursor: "pointer", fontWeight: 600 }}
  onClick={() => routeTo(`/${e.meetingCode}`)}
>
  Meeting Code: {e.meetingCode}
</Typography>

        <Typography>
          Date: {formatDate(e.date)}
        </Typography>
      </CardContent>
    </Card>
  ))
) : (
  <Typography>No meeting history found</Typography>
)}
<Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSnackbar(false)}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    severity="error"
    onClose={() => setOpenSnackbar(false)}
  >
    {snackbarMsg}
  </MuiAlert>
</Snackbar>
</div>
  )}
