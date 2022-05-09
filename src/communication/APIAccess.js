import congifuration from '../configuration';
let backendAddress = congifuration.backendAddress;

let APIAccess = {
  addCustomer: (email, password) => {
    return fetch(`${backendAddress}/customer`, {
      method: 'Post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}) 
    })
    .then(x => x.json())
    .then(x => {
        return x;
    });
  },

  login: (email, password) => {
    return fetch(`${backendAddress}/login`, {
      method: 'Post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}) 
    })
    .then(x => x.json())
    .then(x => {
        return x;
    });
  },

  
  isLoggedIn: () => {
    return fetch(`${backendAddress}/loggedin`, {
        method: 'Get',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true
        }
     })
    .then(x => x.json())
    .then(x => {
        return x;
    });
  }, 

  logout: () => {
    return fetch(`${backendAddress}/logout`, {
      method: 'Post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
    })
    .then(x => x.json())
    .then(x => {
        return x;
    });
  },


  search: (search_term, user_location, maximum_results_to_return, radius_filter, category_filter, sort) => {
    return fetch(`${backendAddress}/search`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({search_term, user_location, maximum_results_to_return, radius_filter, category_filter, sort}) 
    })
    .then(x => x.json())
    .then(x => {
        return x;
    });
  },

  addPlace: (name, category_id, latitude, longitude, description, customerID) => {
    return fetch(`${backendAddress}/place`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({name, category_id, latitude, longitude, description, customerID}) 
    })
    .then(x => x.json())
    .then(x => {
        return x;
    })
  },

  addReview: (place_id, comment, rating, customerID) => {
    return fetch(`${backendAddress}/review`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({place_id, comment, rating, customerID}) 
    })
    .then(x => x.json())
    .then(x => {
        return x;
    })
  },

  editPlace: (place_id, name, category_id, latitude, longitude, description, customerID) => {
    return fetch(`${backendAddress}/place`, {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({place_id, name, category_id, latitude, longitude, description, customerID}) 
    })
    .then(x => x.json())
    .then(x => {
        return x;
    })
  },
  
  deletePlace: (place_id, customerID) => {
    return fetch(`${backendAddress}/place`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({place_id, customerID}) 
    })
    .then(x => x.json())
    .then(x => {
        return x;
    })
  },

  getCategory: () => {
    return fetch(`${backendAddress}/category`, {
      method: 'Get',
      credentials: "include",
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": true
      }
    })
    .then(x => x.json())
    .then(x => {
        return x;
    })
  },

  addPhoto: (photo, place_id, review_id) => {
    return fetch(`${backendAddress}/photo`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({photo, place_id, review_id}) 
    })
    .then(x => x.json())
    .then(x => {
        return x;
    })
  }
  
}

export default APIAccess;