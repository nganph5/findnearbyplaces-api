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
    console.log(`${backendAddress}/search`)
    console.log(search_term, user_location, maximum_results_to_return, radius_filter, category_filter, sort)
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
  }
}

export default APIAccess;