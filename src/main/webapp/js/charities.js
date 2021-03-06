/** Creates and displays a map on the page with everyone's favourite locations */
function createCharities() {
	  /*add login to the page*/
      addLoginOrLogoutLinkToNavigation();

      fetch('/charity-data').then(function(response) {
        return response.json();
      }).then((charities) => {

        const map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.141964, lng: -94.571583},
          zoom:5
        });

        charities.forEach((charity) => {
         addLandmark(map, parseFloat(charity.lat), parseFloat(charity.lng), charity.name)
        });

      });

 }

//Adds a marker that shows an info window when clicked.
function addLandmark(map, lat, lng, title) {
  const marker = new google.maps.Marker ({
    position: {lat: lat, lng: lng},
    map: map,
    title: title
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}

/* Searches and displays the names of the charities matching a certain type*/
function displayCharities() {

	var name = document.getElementById('search-name').value;
	var city = document.getElementById('search-city').value;
	var type = document.getElementById('search-type').value;

	if(name === 'Enter Name' || Object.entries(name).length === 0) {
	    name = "null";
	}
	if(city === 'Enter City' || Object.entries(city).length === 0) {
	    city = "null";
	}
	if(type === 'Select Type' || Object.entries(type).length === 0) {
	    type = "null";
	}

    const url = '/search-charities?name=' + name + '&city=' + city + '&type=' + type;


    fetch(url, {method:'GET'}).then(function(response) {
      return response.json();
    }).then((charities) => {

      const charityContainer = document.getElementById('display-charities');
      charityContainer.innerHTML = '';

      if(Object.entries(charities).length === 0) {
        charityContainer.innerHTML += "Sorry, there are no charities matching this combination of filters!";
      }

      else {

          charities.forEach((charity) => {
          charityContainer.innerHTML += charity.name + ', ' + charity.city + '<br>';
          });
      }

    });

 }

/* Displays all the available types of charities in the database.*/
 function displayTypes() {

    const url = '/search-charities';
    fetch(url, {method:'PUT'}).then(function(response) {
      return response.json();
    }).then((types) => {

      var select = document.getElementById('search-type');

      if(Object.entries(types).length === 0) {
          var option = document.createElement('option');
          option.text = option.value = 'No charities available';
          select.add(option);
      }

      else {
          types.forEach((type) => {
          var option = document.createElement('option');
              option.text = option.value = type;
              select.add(option);
          });
      }
    });
 }

 
 /**
 * Adds a login or logout link to the page, depending on whether the user is
 * already logged in.
 */
function addLoginOrLogoutLinkToNavigation() {
  const navigationElement = document.getElementById('navigation');
  if (!navigationElement) {
    console.warn('Navigation element not found!');
    return;
  }

  fetch('/login-status')
      .then((response) => {
        return response.json();
      })
      .then((loginStatus) => {
        if (loginStatus.isLoggedIn) {
          navigationElement.appendChild(createListItem(createLink(
              '/user-page.html?user=' + loginStatus.username, 'Your Page')));

          navigationElement.appendChild(
              createListItem(createLink('/logout', 'Logout')));
        } else {
          navigationElement.appendChild(
              createListItem(createLink('/login', 'Login')));
        }
      });
}

/**
 * Creates an li element.
 * @param {Element} childElement
 * @return {Element} li element
 */
function createListItem(childElement) {
  const listItemElement = document.createElement('li');
  listItemElement.appendChild(childElement);
  return listItemElement;
}

/**
 * Creates an anchor element.
 * @param {string} url
 * @param {string} text
 * @return {Element} Anchor element
 */
function createLink(url, text) {
  const linkElement = document.createElement('a');
  linkElement.appendChild(document.createTextNode(text));
  linkElement.href = url;
  return linkElement;
}
	  

	  

