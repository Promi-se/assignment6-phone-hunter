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
