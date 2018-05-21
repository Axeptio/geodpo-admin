import axios from 'axios';

export default class Api {

  constructor(configuration) {
    this.baseURL = configuration.baseURL;
    this.client = axios.create({
    	baseURL: this.baseURL,
      	headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
    this.token = configuration.token;
    this.saveToken();
    this.addAuthorizationHeader();
  }

  loadSubmittedProfiles (callback, error) {

    this.client.get("/data/profiles?state=submitted")
    .then(function(response) {

      callback(response.data.map(e => {
        e.data.id = e.id;
        return e;
      }));
    })
    .catch(err => {

      if (error !== undefined)
        error(err);
    });
  }

  loadProfiles (callback, error) {

  	this.client.get("/data/profiles")
  	.then(function(response) {

  		callback(response.data.map(e => {
  			e.data.id = e.id;
  			return e;
  		}));
  	})
  	.catch(err => {

      if (error !== undefined)
      	error(err);
  	});
  }

  loadProfile (id, state, callback, error) {

    this.client.get(`/data/profiles/${id}/${state}`)
    .then(function(response) {

      callback(response.data);
    })
    .catch(err => {

      if (error !== undefined)
        error(err);
    });
  }

  publishProfile (id, callback, error) {

    this.changeProfileState(id, "submitted", "published", callback, error)
  }

  unpublishProfile (id, callback, error) {

    this.changeProfileState(id, "published", "submitted", callback, error)
  }

  changeProfileState (id, fromState, toState, callback, error) {

    this.client.put(`/data/profiles/${id}/state`,
    {
      from: fromState,
      to: toState
    }).then(function (response) {

      callback(response);
    })
    .catch(err => {

      if (error !== undefined)
        error(err);
    })
  }

  loadMissions (callback, error) {

  	this.client.get("/data/missions").then(function(response) {

  		callback(response.data);
  	})
  	.catch(err => {

      if (error !== undefined)
      	error(err);
  	});
  }

  uploadFile(file, callback, error) {

    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    this.client.post('/assets', formData, config)
    .then(function(response) {

    	callback(response.data);
    })
  	.catch(err => {

      if (error !== undefined)
      	error(err);
  	});
  }

  getAssetData (id, callback, error) {

  	this.client.get(`/assets/${id}/metadata`)
  	.then(function(response) {

  		callback(response.data)
  	})
  	.catch(err => {

      if (error !== undefined)
      	error(err);
  	});
  }

  submitProfile (profile, callback, error) {

  	this.client.post(`/data/profiles/submitted`, profile)
  	.then(function(response) {

  		callback(response.data);
  	})
  	.catch(err => {

      if (error !== undefined)
      	error(err);
  	});
  }

  editProfile (id, profile, callback, error) {

  	this.client.put(`/data/profiles/${id}/submitted`, profile)
  	.then(function(response) {

  		callback(response.data);
  	})
  	.catch(err => {

      if (error !== undefined)
      	error(err);
  	});
  }

  eraseProfile (id, state, callback, error) {

  	this.client.delete(`/data/profiles/${id}/${state}`, )
  	.then(function(response) {

  		if (callback !== undefined)
  			callback(response.data);
  	})
  	.catch(err => {

      if (error !== undefined)
      	error(err);
  	});
  }

  auth(params, mode, callback, error) {

  	this.client
    .post('/auth/local/' + mode, params)
    .then(response => {

      this.token = response.data.token;
      localStorage.setItem(Api.AUTH_USER, params.username);
      this.saveToken();
      this.addAuthorizationHeader();
      if (callback !== undefined)
      	callback(response.data);
    })
    .catch(err => {
      localStorage.removeItem(Api.AUTH_TOKEN);
      if (error !== undefined)
      	error(err);
    });
  }

  saveToken() {
    localStorage.setItem(Api.AUTH_TOKEN, this.token);
  }

  getApiUser() {

  	return localStorage.getItem(Api.AUTH_USER);
  }

  addAuthorizationHeader() {
    this.client.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
  }
}

Api.AUTH_USER = "user";