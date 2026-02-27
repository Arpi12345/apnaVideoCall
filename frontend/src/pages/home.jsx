import React, { useContext, useState } from 'react'
import withAuth from '../utils/WithAuth'
import { useNavigate } from 'react-router-dom'
import styles from "../styles/homeComponent.module.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';


function HomeComponent() {
    const [meetingCode, setMeetingCode] = useState("");
let navigate = useNavigate();

const {addToUserHistory} = useContext(AuthContext);

let handleJoinVideoCall = async()=>{
    if(!meetingCode.trim()) return;
   const res = await addToUserHistory(meetingCode)
   console.log("Add history response:", res?.data)
    navigate(`/${meetingCode}`)
}

  return (
 <>
 <div className={styles.navBar}>
    <div style={{display:"flex", alignItems:"center"}}>
        <h2>Apna Video Call</h2>
         </div>
        <div style={{display:'flex', alignItems:"center",}}>
            <IconButton onClick={() =>{
                navigate("/history")
            }}>
              <RestoreIcon/>
                     </IconButton>
              <p>History</p>
              <Button onClick ={() =>{
                localStorage.removeItem("token")
                navigate("/auth")
              }}>Logout</Button>
    </div>
 </div>
 <div className={styles.meetContainer}>
    <div className={styles.leftPanel}>
        <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>
            <div style={{display:"flex", gap:"10px"}}>
                <TextField  label="Meeting Code" onChange={(e) =>setMeetingCode(e.target.value)} id='outlined-basic' variant='outlined'/>
                    <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
            </div>
        </div>
    </div>
    <div className={styles.rightPanel}>
        <img src='/logo3.png' alt=''/>
    </div>
 </div>
 </>
  )
}
export default withAuth(HomeComponent)