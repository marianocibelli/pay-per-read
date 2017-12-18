import React from 'react';

const TryAuth0Section = (props) =>{

      return (<section className="try-auth0-section">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="try-auth0-card text-center">
                        <img className="try-auth0-logo" src="https://cdn.auth0.com/styleguide/components/1.0.8/media/logos/img/badge.png" alt="" />
                        <h1 className="try-auth0-card-title">The new way to solve Identity</h1>
                        <p className="try-auth0-card-info" >We solve the most complex indentity use cases with an extensible and easy to use platform</p>
                        <ul>
                          <li><i className="icon-budicon-499 icon" aria-hidden="true"></i> Risk-based and prioritized security</li>
                          <li><i className="icon-budicon-499 icon" aria-hidden="true"></i> Enterprise-class availability</li>
                          <li><i className="icon-budicon-499 icon" aria-hidden="true"></i> Built by Security Experts</li>
                        </ul>
                        <div className="button-row">
                          <button className="btn btn-success btn-md">Try auth0 for Free</button>
                          <button className="btn btn-transparent btn-md">Talk to sales</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
  }

export default TryAuth0Section;
