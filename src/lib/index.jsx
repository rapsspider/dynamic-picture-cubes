import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const CubeBlock = glamorous.div(props => ({
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  width: props.width,
  height: props.height,
  backgroundColor: props.color,
}));

CubeBlock.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const CubeBlockChild = glamorous.div(
  props => {
    const sWidth = props.width / props.colLength;
    const sHeight = props.height / props.rowLength;
    const posLeft = sWidth * props.col_index;
    const posTop = sHeight * props.row_index;
    const backPosLeft = -sWidth * props.col_index;
    const backPosTop = -sHeight * props.row_index;

    return {
      left: posLeft,
      top: posTop,

      width: `${sWidth}px`,
      height: `${sHeight}px`,
      position: 'absolute',
      transformStyle: 'preserve-3d',
      transition: 'transform 1s linear',
      transform: 'translateZ(-600px)',

      '.right': {
        transform: 'translateZ(-600px) rotateY(90deg)',
      },

      '> .face': {
        position: 'absolute',
        width: `${sWidth}px`,
        height: `${sHeight}px`,
      },

      '> .main': {
        backgroundPosition: `left ${backPosLeft}px top ${backPosTop}px`,
        backgroundImage: `url('${props.img}')`,
        backgroundRepeat: 'no-repeat',
        transform: `translateX(0px) translateZ(calc(${sWidth}px/2)) rotateY(0deg)`,
      },
    };
  },
  props => {
    const sWidth = props.width / props.colLength;
    const sHeight = props.height / props.rowLength;
    const backPosLeft = -sWidth * props.col_index;
    const backPosTop = -sHeight * props.row_index;
    if (props.rightImg) {
      return {
        '> .right': {
          backgroundPosition: `left ${backPosLeft}px top ${backPosTop}px`,
          backgroundImage: `url('${props.rightImg}')`,
          backgroundRepeat: 'no-repeat',
          transform: `translateX(calc(-${sWidth}px/2)) rotateY(-90deg)`,
        },
      };
    } // else
    return {
      '> .right': {
        transform: `translateX(calc(-${sWidth}px/2)) rotateY(-90deg)`,
      },
    };
  },
);

CubeBlockChild.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  col_index: PropTypes.number.isRequired,
  row_index: PropTypes.number.isRequired,
  colLength: PropTypes.number.isRequired,
  rowLength: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  rightImg: PropTypes.string.isRequired,
};

class Cube extends React.Component {
  componentDidMount() {
    this.showCubes();
  }

  cubesRef = [];

  hideCubes = () => {
    setTimeout(() => {
      let time = 0;
      const diff = this.props.timeBetweenHideCube;

      if (diff) {
        for (let i = 0; i < this.props.colLength; i++) {
          for (let j = 0; j < this.props.rowLength; j++) {
            setTimeout(() => {
              if (this.cubesRef[i][j]) {
                this.cubesRef[i][j].className = `${this.cubesRef[i][j].className} right`;
              }
            }, (time += diff));
          }
        }
      } else {
        for (let i = 0; i < this.props.colLength; i++) {
          for (let j = 0; j < this.props.rowLength; j++) {
            if (this.cubesRef[i][j]) {
              this.cubesRef[i][j].className = `${this.cubesRef[i][j].className} right`;
            }
          }
        }
      }
      this.showCubes();
    }, this.props.timeBeforeHide);
  };

  showCubes = () => {
    setTimeout(() => {
      let time = 0;
      const diff = this.props.timeBetweenShowCube;

      if (diff) {
        for (let i = 0; i < this.props.colLength; i++) {
          for (let j = 0; j < this.props.rowLength; j++) {
            setTimeout(() => {
              if (this.cubesRef[i][j]) {
                this.cubesRef[i][j].className = this.cubesRef[i][j].className.replace('right', '')
              }
            }, (time += diff));
          }
        }
      } else {
        for (let i = 0; i < this.props.colLength; i++) {
          for (let j = 0; j < this.props.rowLength; j++) {
            if (this.cubesRef[i][j]) {
              this.cubesRef[i][j].className = this.cubesRef[i][j].className.replace('right', '')
            }
          }
        }
      }
      this.hideCubes();
    }, this.props.timeBeforeShow);
  };

  addCubeRef = (i, j, ref) => {
    if (!this.cubesRef[i]) {
      this.cubesRef[i] = [];
    }
    this.cubesRef[i][j] = ref;
  };

  renderCubes = () => {
    const cubes = [];
    for (let i = 0; i < this.props.colLength; i++) {
      for (let j = 0; j < this.props.rowLength; j++) {
        cubes.push(
          <CubeBlockChild
            innerRef={ref => this.addCubeRef(i, j, ref)}
            key={`cube-${i}_${j}`}
            height={this.props.height}
            className={'right'}
            width={this.props.width}
            col_index={i}
            row_index={j}
            colLength={this.props.colLength}
            rowLength={this.props.rowLength}
            img={this.props.img}
            rightImg={this.props.rightImg}
          >
            <div className={'face right'} />
            <div className={'face main'} />
            <div className={'face left'} />
          </CubeBlockChild>,
        );
      }
    }
    return cubes;
  };

  render() {
    return (
      <CubeBlock
        height={this.props.height}
        width={this.props.width}
        color={this.props.color}
      >
        {this.renderCubes()}
      </CubeBlock>
    );
  }
}

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

export default Cube;