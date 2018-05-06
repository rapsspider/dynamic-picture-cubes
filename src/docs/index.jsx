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
