import React from 'react';
import { Link } from 'bisheng/router';
import '../static/style';

export default ({ themeConfig, children }) => {
  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="brand">
            <Link className="home" to={themeConfig.home}>{themeConfig.sitename}</Link>
            {
              !themeConfig.tagline ? null :
                <span>- <span className="tagline">{themeConfig.tagline}</span></span>
            }
          </div>
          {
            !themeConfig.navigation ? null :
              <div className="menu" role="navigation">
                {
                  themeConfig.navigation.map((item, index) =>
                    <Link to={item.link} key={index}>{item.title}</Link>
                  )
                }
              </div>
          }
        </div>
      </div>
      <div className="document yue">
        {children}
      </div>
      <div className="footer">
        {themeConfig.footer ? themeConfig.footer : null}
        {
          themeConfig.hideBisheng ? null :
            <p className="copyright">powered by <a href="https://github.com/benjycui/bisheng">BiSheng</a></p>
        }
      </div>
      {
        !themeConfig.github ? null :
          <div className="github"><a className="github-link" href={themeConfig.github}>Fork me on GitHub</a></div>
      }
    </div>
  );
}
