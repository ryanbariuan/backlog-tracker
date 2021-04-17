import React from 'react';
import './FooterComponent.css';

class FooterComponent extends React.Component
{
  render()
  {
    return(
      <footer>
        <p>&copy; 2021 GBT. All Rights Reserved.</p>
        <p>Fonts used from <a href="https://www.dafont.com">dafont</a></p>
        <p>Icons used from <a href ="https://www.flaticon.com">flaticons</a></p>
      </footer>
    );
  }
}

export default FooterComponent;