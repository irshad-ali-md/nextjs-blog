import React, { PureComponent } from 'react'
import Link from 'next/link'

export default class Layout extends PureComponent {
  render() {
    return (
      <div className='layout'>
        <header>
          {/* <img src='/static/next-logo.png' /> */}
          <h3>Yep!</h3>
          <menu>
            <Link href='/'>
              <a>Home</a>
            </Link>
            <Link href='/about'>
              <a>About</a>
            </Link>
          </menu>
          <style jsx>{`
            header {
              display: flex;
              align-items: center;
              font-family: Monospace;
              margin: 10px 20px;
            }
            h3 {
              margin-left: 10px
            }
            img {
              width: 30px;
            }
            menu > a {
              margin-right: 16px;
            }
          `}</style>
        </header>
        {this.props.children}
      </div>
    )
  }
}
