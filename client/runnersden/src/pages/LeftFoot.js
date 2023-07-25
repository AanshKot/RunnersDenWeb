import Navbar from '../components/Navbar'
import MobilityButton from '../components/MobilityButtons'
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import { useEffect,useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LeftFoot({isLoggedIn}) {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const navigate = useNavigate();

    const [hasPhoto,setHasPhoto] = useState(false);
   

    const getVideo = () => {
        
        navigator.mediaDevices.getUserMedia({audio : false ,video: {width : 1080, height : 1920,facingMode:"environment"} }).then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
            
        }).catch(err => {
            console.log(err);

        })
    }

    const takePhoto = async () => {
        const width = 414;
        const height = width/(16/9);
        
        

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');

        ctx.drawImage(video,0,0,width,height);

        const base64Image = photo.toDataURL('image/jpeg');

        
        console.log(base64Image);

        if(isLoggedIn){
            try {
                const user =  await Auth.currentAuthenticatedUser();
                const jsonified_img_64 = JSON.stringify(base64Image);

                await Auth.updateUserAttributes(user, {
                    'custom:imageL': jsonified_img_64
                  });

            } catch (error) {
                console.log("error updating image",error);
            }
        }
        else{
            sessionStorage.setItem("imageL",base64Image);
            console.log("stored imageL in session storage");
        }
        
        navigate("/confirmation/L");


        setHasPhoto(true);
    }

    useEffect(() => {
        getVideo();
    },[videoRef])

  return (
   
    <div className="content">

    

        <div className="titleContainer">
        <MobilityButton renderNext={false} backLink={"instructions/4"} nextLink={""} />
            <div className="header">
                

                <h1
                className="freeGuest"
                style={{
                    color : "#1DB954",
                    fontFamily: 'Poppins',
                    fontSize: '28px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                }}
                >
                Left Foot
                </h1>
            </div>
        </div>

        <div className='paragraph'>
            <p className='paragraph-desc'>Place your foot on the white square with your heel against the wall.</p>
            <p className='paragraph-desc'>To center your foot, place it on the green line.</p>
            <p className='paragraph-desc'>Make sure the white square is straight and within the box.</p>
            <p className='paragraph-desc'>Take the photo!</p>

        </div>

            
            <div className={!hasPhoto ? "camera" : "hide-vid"} style={{display: "flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"15px"}}>
                <video className='livefeed' ref={videoRef}></video>
                <button id='click-photo' onClick={takePhoto} className='camera-submit'><FontAwesomeIcon className='camera' icon={faCamera} /></button>
            </div> 
        

    
            <div className={"result" + (hasPhoto ? 'hasPhoto' : "")}>
            <canvas ref={photoRef}> </canvas>
            </div>

        

           
            
        

    </div>

    

  )
}

export default LeftFoot