async function makePostRequest(url, data) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Endpoint response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }


const url = ' http://univesole-app-balancer-1660443584.ca-central-1.elb.amazonaws.com/api'; // Replace with your API endpoint
const data = {
  userid: 14165810,
  left_link: 'https://809cd8fc26abdd8143d6399e79b15687.cdn.bubble.io/f1682705057258x898183029341518700/image%2Fjpeg',
  right_link: 'https://809cd8fc26abdd8143d6399e79b15687.cdn.bubble.io/f1682705057258x898183029341518700/image%2Fjpeg',
  paper_size: 'Letter',
  input_size: 10.0,
  sex: "Men's",
  resize: 0.4,
  debug: 'True',
};

async function exampleUsage() {
  const response_data = await makePostRequest(url, data);
  if (response_data) {
    console.log('Response:', response_data);
  }
}

exampleUsage();