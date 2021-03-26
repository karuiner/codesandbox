import { Component } from "react";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rings: [] };
    this.position = this.position.bind(this);
    this.stream = this.stream.bind(this);
    this.get_rgb_random_color = this.get_rgb_random_color.bind(this);
    this.time = 0;
    this.rings = [];
    this.rnum = 0;
  }
  position(t, v) {
    let x = (v * (t / 1000)) % 100;
    let xrad = (((x + 50) / 50) * Math.PI) / 2;
    let y = 50 + (-30 * Math.sin(xrad) - (10 - 0.2 * x));
    this.setState({ x: x, y: y });
    return [x, y];
  }
  componentDidMount() {
    requestAnimationFrame(this.stream);
  }
  get_rgb_random_color() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  stream(time) {
    if (time - this.time > 1000) {
      //      this.rings['time']=time
      this.time = time;
      if (this.rnum < 30) {
        let v = 1 + Math.random() * 2,
          rad = 10 + Math.random() * 30,
          color = this.get_rgb_random_color(),
          depth = 1 + Math.random() * 4;
        let [x, y] = this.position(time, v);
        this.rings.push({
          id: this.rnum,
          vel: v,
          time: time,
          rad,
          color,
          x,
          y,
          depth
        });
        this.rnum++;
      }
    }
    this.rings = this.rings.map((obj) => {
      let [x, y] = this.position(time, obj.vel);
      return { ...obj, x, y };
    });
    let prings = this.rings.map((obj, i) => {
      return <Ring key={i} {...obj} />;
    });
    this.setState({ rings: prings });
    requestAnimationFrame(this.stream);
  }

  render() {
    return <div className="App">{this.state.rings}</div>;
  }
}

function Ring(props) {
  let { rad, color, depth, x, y } = props;
  let styles = {
    border: `solid ${depth}px ${color}`,
    borderRadius: "50%",
    height: `${2 * rad}px`,
    width: `${2 * rad}px`,
    position: "fixed",
    top: `${y}%`,
    left: `${x}%`
  };

  return <div style={styles}></div>;
}

export default App;
