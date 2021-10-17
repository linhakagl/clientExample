import React from 'react'
import './messenger.css'
import { fbChat } from '../Constant'

export default function Messenger() {
  return (
    <a href={fbChat} target="_blank">
      <div className="messenger">
        <div style={{ background: 'none' }}>
          <div tabindex="0" role="button" style={{ cursor: 'pointer', outline: 'none' }}>
            <svg width="60px" height="60px" viewBox="0 0 60 60">
              <svg x="0" y="0" width="60" height="60">
                <defs>
                  <linearGradient x1="50%" y1="100%" x2="50%" y2="0.000340050378%" id="linearGradient-1">
                    <stop stop-color="#0068FF" offset="4.5%"></stop>
                    <stop stop-color="#00C6FF" offset="95.5%"></stop>
                  </linearGradient>
                </defs>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g>
                    <g>
                      <circle fill="#FFFFFF" cx="30" cy="30" r="30"></circle>
                      <g transform="translate(10.000000, 11.000000)">
                        <path d="M0,18.7150914 C0,24.5969773 2.44929143,29.6044708 6.95652174,33.0434783 L6.95652174,40 L14.2544529,36.6459314 C16.0763359,37.1551856 18,37.4301829 20,37.4301829 C31.043257,37.4301829 40,29.0529515 40,18.7150914 C40,8.37723141 31.043257,0 20,0 C8.956743,0 0,8.37723141 0,18.7150914 Z" fill="url(#linearGradient-1)"></path>
                        <polygon fill="#FFFFFF" points="16.9378907 19.359375 7 25 17.8976562 13.140625 23.0570312 18.640625 33 13 22.1023437 24.859375"></polygon>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </svg>
          </div>
        </div>
      </div>
    </a>
  )
}
