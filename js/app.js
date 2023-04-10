// toggle spinner function 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//  show error message function
const showErrorMessage = displayStyle => {
    document.getElementById('result-error').style.display = displayStyle;
}

// handle search input funtion
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // display spinner
    toggleSpinner('block');
    // clear data
    searchField.value = '';
    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
}


// display search result function
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    if(phones.length == 0){
        showErrorMessage('block');
        toggleSpinner('none');
        const phoneDetail = document.getElementById('phone-detail');
        phoneDetail.textContent = '';
    }
    else {
    phones.slice(0, 20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card border-success mb-4 mx-auto w-50">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body text-success text-center">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p>Brand Name: ${phone.brand}</p>
          <button onclick="loadPhoneDetail('${phone.slug}')" class="text-success border-success bg-transparent">Details</button>
        </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
    toggleSpinner('none');
    showErrorMessage('none');
    }
}

// load phone detail function
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))
}

// display Phone Detail function
const displayPhoneDetail = (phone) => {
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="card border-success mb-10 mx-auto w-50">
      <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
      <div class="card-body text-success">
      <h4 class="card-title text-center">${phone.name}</h4>
      <p> <b>Release Date:</b> <br>
      ${phone.releaseDate ? phone.releaseDate: 'Release date is not available.' }</p>
      <p><b>Main Features: </b> </br>
      <b>Storage:</b> ${phone.mainFeatures.storage}. <br>
      <b>Display Size:</b> ${phone.mainFeatures.displaySize}. <br>
      <b>Chip Set:</b> ${phone.mainFeatures.chipSet}. <br>
      <b>Memory:</b> ${phone.mainFeatures.memory}. <br>
      <b>Storage:</b> ${phone.mainFeatures.storage}. <br>
      <b>Sensors:</b> <br>
      1. ${phone.mainFeatures.sensors[0]}. <br>
      2. ${phone.mainFeatures.sensors[1]}. <br>
      3. ${phone.mainFeatures.sensors[2]}. <br>
      4. ${phone.mainFeatures.sensors[3]}. <br>
      5. ${phone.mainFeatures.sensors[4]}. <br>
      6. ${phone.mainFeatures.sensors[5]}.</p>
      <b>Others:</b> <br>
      <b>Bluetooth:</b> ${phone.others ? phone.others.Bluetooth: 'No Bluetooth Information'}. <br>
      <b>GPS:</b> ${phone.others ? phone.others.GPS: 'No GPS Information'}. <br>
      <b>NFC:</b> ${phone.others ? phone.others.NFC: 'No NFC Information'}. <br>
      <b>Radio:</b> ${phone.others ? phone.others.Radio: 'No Radio Information'}. <br>
      <b>USB:</b> ${phone.others ? phone.others.USB: 'No USB Information'}. <br>
      <b>WLAN:</b> ${phone.others ? phone.others.WLAN: 'No WLAN Information'}. <br>
      </div>
      </div>
      `;
    phoneDetail.appendChild(div);
}
