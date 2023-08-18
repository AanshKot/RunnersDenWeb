import Navbar from '../components/Navbar'
import MobilityButton from '../components/MobilityButtons'
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import { useEffect,useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function RightFoot({isLoggedIn,guestID}) {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const navigate = useNavigate();

    const [hasPhoto,setHasPhoto] = useState(false);
    
    const upload_S3 = async (userID, base64Image) => {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: userID,
            image: base64Image,
          }),
        };
      
        try {
          const response = await fetch(`http://localhost:5050/rightfoot`, requestOptions);
          if (!response.ok) {
            throw new Error('Endpoint response was not ok');
          }
          const data = await response.json();
          console.log('Image uploaded successfully:', data.s3ObjectURL);
          return data.s3ObjectURL;
        } catch (error) {
          console.error('Error uploading image:', error);
          // Handle the error accordingly if needed
          throw error; // Rethrow the error to be handled later in the application
        }
      };

      const getVideo = () => {
        const aspectRatioWidth = 3;
        const aspectRatioHeight = 4;

        // ideal condition
        navigator.mediaDevices.getUserMedia({audio : false ,video: { height : { ideal : 5000 } ,facingMode:"environment"} }).then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
            
        }).catch(err => {
            console.log(err);

        })
    }

    const takePhoto = async () => {
        const width = 414;
        const height = width * 1.3;
        
        

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
                // const user =  await Auth.currentAuthenticatedUser();
                // const jsonified_img_64 = JSON.stringify(base64Image);

                // await Auth.updateUserAttributes(user, {
                //     'custom:imageL': jsonified_img_64
                //   });

                const user =  await Auth.currentAuthenticatedUser();

                if(user){
      
                    const { "custom:id": userID } = user.attributes;
            
                    // Convert the preferences back to an object if needed
                    const parsedID = JSON.parse(userID);
            
                    // console.log("User ID:", parsedID);
                   
                    const imageRUrl = await upload_S3(parsedID,base64Image);
                    const json_imageRUrl = JSON.stringify(imageRUrl);

                    await Auth.updateUserAttributes(user, {
                        'custom:imageR': json_imageRUrl
                    });
                
                    console.log("User imageR updated");

                  }

            } catch (error) {
                console.log("error updating image",error);
            }
        }
        else{

            const imageLUrl = await upload_S3(guestID,base64Image);

            sessionStorage.setItem("imageR",imageLUrl);
            console.log("stored imageR in session storage");
        }
        
        navigate("/confirmation/R");


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
                Right Foot
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

export default RightFoot