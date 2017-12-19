import auth0 from 'auth0-js';
import axios from 'axios';
import { AUTH_CONFIG } from '../config/auth0-variables';

const auth0Instance = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid'
})
export default class Auth {

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login(book, context) {
    localStorage.setItem('bookId', book.id)
    localStorage.setItem('bookName', book.name)
    localStorage.setItem('bookTagline', book.tagline)
    auth0Instance.popup.authorize({
      connection: 'twitter'
    }, (res,err) => {
      const downloadLink = localStorage.getItem('downloadLink');
      if(!err && downloadLink){
        context.setState({
          bookPaid: downloadLink
        })
      }else{
        console.log(err);
      }
      localStorage.removeItem('downloadLink');
      localStorage.removeItem('bookId')
      localStorage.removeItem('bookName')
      localStorage.removeItem('bookTagline')
    });
  }

  handleAuthentication() {
    auth0Instance.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const bookId = localStorage.getItem('bookId')
        const bookName = localStorage.getItem('bookName')
        const bookTagline = localStorage.getItem('bookTagline')
        this.setSession(authResult);
        this.payWithATweet(bookId, bookName, bookTagline);
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  getSession() {
    // Set the time that the access token will expire at
    if (this.isAuthenticated()){
      return {
        access_token: localStorage.getItem('access_token'),
        id_token: localStorage.getItem('id_token')
      }
    }else {
      throw new Error("Unauthorized");
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  payWithATweet(bookId, bookName, bookTagline){
    const session = this.getSession();
    if(session){
      const headers = {
        'Content-Type': 'application/json'
      }
      this.serverRequest =
        axios
          .post(`/api/books/download/${bookId}?name=${bookName}&tagline=${bookTagline}`, session, headers)
          .then((result) => {
            localStorage.setItem('downloadLink',result.data);
            if(opener){
              window.close();
              opener.open(result.data);
            }else{
              window.location = result.data
            }
          }).catch(err => {
            throw err;
            window.close();
          })
    }else{
      throw new Error('Unauthorized')
    }
  }
}
