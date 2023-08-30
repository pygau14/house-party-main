document.addEventListener('DOMContentLoaded', () => {

    // Check if user ID is present in local storage
const userId = localStorage.getItem('token');
console.log(userId);

// If user ID is not found, redirect to login page
if (!userId) {
  window.location.href = 'login.html';
  return
} 
  fetchAllData(userId);
  
    // Function to fetch data from an API
    async function fetchData(url) {
        let mainData = null;
        console.log(url);
    await fetch(url).then((res)=>{
        return res.json();
      }).then((data)=>{
        mainData = data;
      })
      return mainData;
      
    }
  
    // Function to fetch data from all 3 APIs sequentially
    async function fetchAllData(userId) {

      //showLoader();

      const status ='approved';
  
      const apiUrl1 = `https://hp.hnktrecruitment.in/dashboard/user?user_id=${userId}`;
      const apiUrl2 = `https://hp.hnktrecruitment.in/dashboard/party-bookings/${userId}`;
      const apiUrl3 = `https://hp.hnktrecruitment.in/dashboard/party-hosting/${userId}`;
      const partyHostAPI   =  `https://hp.hnktrecruitment.in/fetch-party-data/${userId}/${status}`;
      const placeHostAPI = `https://hp.hnktrecruitment.in/fetch-place-data/${userId}/${status}`;
  
      try {
        const userData = await fetchData(apiUrl1)
        const partyBookingsData = await fetchData(apiUrl2)
        const partyHostingData = await fetchData(apiUrl3);
        const partyData = await fetchData(partyHostAPI);
  
        // Process the fetched data here
        console.log('User Data:', userData);
        console.log('Party Bookings Data:', partyBookingsData);
        console.log('Party Hosting Data:', partyHostingData);
        console.log('party data' , partyData);

        displayProfileData(userData);
        displayPartyBook(partyBookingsData);
        displayPartyHost(partyHostingData);
        displayPartyDataHost(partyData);
  
        //hideLoader();
      } catch (error) {
        console.error('Error fetching data:', error);
        //hideLoader();
      }
    }
  
  
  });

  function displayPartyDataHost(data){
    if(data.length == 0 ){
        document.getElementById('party_message').style.display = 'block';
        document.getElementById('party_host_table').style.display = 'none';
    }else{
        
    }
  }


//   {
//     "name": "gauravgupta",
//     "email": "gaugav14@gmail.com",
//     "mobile_no": "08595993037",
//     "joined": "Aug 2023"
// }

  function displayProfileData(data){
    const name_value = document.getElementById('name_value');
    const email_value = document.getElementById("email_value");
    const doj_value = document.getElementById("doj_value");
    const mobile_value= document.getElementById("mobile_value");


    name_value.innerText = data.name;
    email_value.innerHTML =`<strong>Email :</strong> ${data.email}`;
    mobile_value.innerHTML = `<strong>Phone :</strong> ${data.mobile_no}`;
    doj_value.innerText  = 'Joined United House Party in ' + data.joined;
    
  }

//   {
//     "attending": 0,
//     "attended": 0
// }

  function displayPartyBook(data){
    const attending_value = document.getElementById('attending');
    const attended_value = document.getElementById('attended');


    attending_value.innerText = data.attending;
    attended_value.innerText = data.attended;




  }

//   {
//     "hosting": 0,
//     "hosted": 0
// }

  function displayPartyHost(data){
    const hosted = document.getElementById("hosted");
    const hosting = document.getElementById("hosting");


    hosted.innerText = data.hosted;
    hosting.innerText = data.hosting;


  }