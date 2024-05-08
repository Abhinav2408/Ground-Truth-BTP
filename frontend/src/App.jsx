import { useState } from 'react'
import axios from 'axios'
import './App.css'
import brake from './assets/img/brake.png'
import left from './assets/img/left.png'
import right from './assets/img/right.png'
import uturn from './assets/img/uturn.png'
import lane_change from './assets/img/lane_change.png'
import overspeeding from './assets/img/overspeeding.png'
import pothole from './assets/img/pothole.png'
import bump from './assets/img/bump.png'

function App() {
  const [login, setLogin] = useState(false);
  const backendUrl = 'http://10.17.5.49:3444';

  const axiosWithProxy = axios.create({
    // Specify your proxy configuration
    proxy: {
      host: 'proxy22.iitd.ac.in',
      port: 3128,
      auth: {
        username: 'mt1200780',
        password: '536eb946'
      }
    }
  });
  function doLogin(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // perform post request to backend via /login
   axiosWithProxy.post(backendUrl+'/login', {
      username: username,
      password: password
    }).then(response => {
      if (response.status !== 200) {
        console.log(response.data);
        return;
      } else{
        console.log('Login successful');
        setLogin(true);
      }
    })
  }

  var label_name = "default";

  function showOverlay(labels){
    label_name = labels;
    var div = document.getElementById('overlay-content');
    label_name = labels;
    div.innerHTML = "<center><h2>You clicked on the label:<h2> </center> <br><center><h1>" + labels + "</center> </h1>";
    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    const additionalValue = String(labels); 
    document.getElementById('labeldata').value = additionalValue;
  }

  function hideOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
  }

  function sendData() {
    // perform post request to backend via /sendData
    axiosWithProxy.post(backendUrl+'/post_label', {
      label: label_name
    }).then(response => {
      if (response.status !== 200) {
        console.log(response.data);
      } else{
        console.log('Data has been saved!!');
      }
    })
    hideOverlay();
  }


  return (
    <div>
      {login ==false ? (
          <div>
            <div className='header'>
                <h1><center>Ground-Truth App</center></h1>
            </div>
            <center>
              <label style={{
                fontSize: '1.25rem'
              }}>Username:</label>
              <br/>
              <input type="text" id="username"style={{
                fontSize: '1.25rem'
              }}></input>
              <br/><br/>
              <label style={{
                fontSize: '1.25rem'
              }}>Password:</label>
              <br/>
              <input type="password" id="password"style={{
                fontSize: '1.25rem'
              }}></input>
              <br/><br/>
              <button style={{
                fontSize: '1.25rem'
              }} onClick={doLogin}>Submit</button>
              <h3 style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>&copy;IIT DELHI</h3>
            </center>
          </div>
      ):(
          <div>
            <div className="header">
              <h1><center>Ground-Truth App</center></h1>
            </div>

            <div className="container" id ="itemContainer">
              <div className="item" style={{
                marginLeft: 'auto',
                marginRight: 'auto',
              }} onClick={()=>showOverlay('Logging Start')}>
                <div><h3>Logging Start</h3></div>
              </div>
            </div>

            <div className="container" id="itemContainer">
              <div className="item1" onClick={()=>showOverlay('Bump')}>
                <img className="icon"  src={bump} alt="Icon 1"></img>
                <div><h3>Bump</h3></div>
              </div>
              <div className="item1" onClick={()=>showOverlay('Pothole')}>
                <img className="icon"  src={pothole} alt="Icon 2"></img>
                <div><h3>Pothole</h3></div>
              </div>
            </div>

            <div className="container" id="itemContainer">
              <div className="item" onClick={()=>showOverlay('Left Turn')}>
                <img className="icon2"  src={left} alt="Icon 1"></img>
                <div><h3>Left Turn</h3></div>
              </div>
            <div className="item" onClick={()=>showOverlay('U Turn')}>
                <img className="icon2"  src={uturn} alt="Icon 2"></img>
                  <div><h3>U<br/> Turn</h3></div>
              </div>
              <div className="item" onClick={()=>showOverlay('Lane Change')}>
                  <img className="icon2"  src={lane_change} alt="Icon 1"></img>
                  <div><h3>Lane Change</h3></div>
                </div>
              <div className="item" onClick={()=>showOverlay('Right Turn')}>
                <img className="icon2"  src={right} alt="Icon 2"></img>
                <div><h3>Right Turn</h3></div>
              </div>
            </div>  

            <div className="container" id="itemContainer">
              <div className="item1" onClick={()=>showOverlay('Harsh Brake')}>
                <img className="icon"  src={brake} alt="Icon 1"></img>
                <div><h3>Harsh Brake</h3></div>
              </div>
              <div className="item1" onClick={()=>showOverlay('Over-Speeding')}>
                <img className="icon"  src={overspeeding} alt="Icon 2"></img>
                <div><h3>Over Speeding</h3></div>
              </div>
            </div>

  
            <div id="overlay" className="overlay">
              <div className="overlay-content">
                <div id="overlay-content">Overlay Content</div>
                    <input type="hidden" id="labeldata" name="label"></input>
                    <center>
                    <button value="Confirm" style={{
                      backgroundColor: '#4CAF50',
                      border: 'none',
                      color: 'white',
                      padding: '15px 32px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontSize: '16px',
                      margin: '50px 50px',
                      marginTop: '10px',
                      cursor: 'pointer'
                    }} onClick ={sendData}>Confirm</button>
                    <button name="back" value="goBack" style={{
                      backgroundColor: 'red',
                      border: 'none',
                      color: 'white',
                      padding: '15px 32px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontSize: '16px',
                      margin: '50px 50px',
                      marginTop: '10px',
                      cursor: 'pointer'
                    }} onClick ={hideOverlay}>Go Back</button>
                    
                    </center>
              </div>
            </div>
            <center><h3>&copy;IIT DELHI</h3></center>
          </div>
        )
      }
    </div>
  )
}


export default App