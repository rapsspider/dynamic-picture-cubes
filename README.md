[Demo](https://rapsspider.github.io/dynamic-picture-cubes/)

## Installation

dynamic-picture-cubes is available as an [npm package](https://www.npmjs.com/package/dynamic-picture-cubes).

```sh
npm install --save dynamic-picture-cubes
```

## Usage

Here is a quick example :

```jsx
import React from "react";
import { render } from "react-dom";
import Cube from "../../lib";
import "./styles.css";

function Demo() {
  return (
    <div>
      <h1>Demo with examples of the component</h1>
	  <h2>With one image</h2>
        <Cube
          height={'560'}
          width={'560'}
          colLength={5}
          rowLength={5}
          color={'#aaa'}
          img={'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'}
        />
	  <h2>With two images</h2>
        <Cube
          height={'560'}
          width={'560'}
          colLength={5}
          rowLength={5}
          color={'#aaa'}
          img={'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'}
          rightImg={'https://www.drupal.org/files/project-images/octocat_fluid.png'}
        />
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
```

## Parameters

```jsx
Cube.defaultProps = {
  timeBeforeHide: 5000,
  timeBeforeShow: 2500,
  timeBetweenHideCube: 50,
  timeBetweenShowCube: 50,
};

Cube.propTypes = {
  timeBeforeHide: PropTypes.number,
  timeBeforeShow: PropTypes.number,
  timeBetweenHideCube: PropTypes.number,
  timeBetweenShowCube: PropTypes.number,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  colLength: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  rowLength: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  rightImg: PropTypes.string.isRequired,
};
```