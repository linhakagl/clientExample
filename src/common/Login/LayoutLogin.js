import React from 'react'
import seedingLogo from '../../assets/seedingLogo.jpg'

export default function LayoutLogin(props) {
  return (
    <div className="container-login">
      <div className="login-left">
        <div className="login-pf-page">
          <div className="card-pf  animated fadeInUp">
            <header className="login-pf-header">
              <h1 id="kc-page-title">
                {props.title}
              </h1>
            </header>
            <div id="kc-content">
              <div id="kc-content-wrapper">
                <div id="kc-form">
                  <div id="kc-form-wrapper">
                    {props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="login-right" style={{ backgroundImage: `url(${seedingLogo})` }}></div>
    </div >
  )
}
