import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from './Auth';
import BookContainer from './containers/BookContainer';
import Callback from './dumb/Callback';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const Routes = (ssrObj) =>{
  const {props} = ssrObj;
      return (
        <Switch>
          <Route path="/books/:bookId" render={
          () => {
            return (
              <BookContainer book={props.book} />
            )
          }
        }/>
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback />
        }}/>
        </Switch>)
}

export default Routes
