import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userCard: {},
      followers: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/chance10113")
      .then((res) => {
        // console.log("res", res);
        // console.log("User res.data", res.data);
        // console.log("User res.data.name", res.data.name);
        this.setState({
          userCard: res.data,
        });
      })
      .catch((error) => {
        console.log("userCard axios error", error);
      });
    axios
      .get("https://api.github.com/users/chance10113/followers")
      .then((res) => {
        // console.log("res", res)
        // console.log("follower res.data", res.data);
        this.setState({
          followers: res.data,
        });
      })
      .catch((error) => {
        console.log("follower axios error", error);
      });
  }

  render() {
    return (
      <div className="container">
        <h1> GitHub User Card! </h1>
        <div className="userCard">
          <img
            src={this.state.userCard.avatar_url}
            alt="Avatar"
            className="userImg"
          />
          <div className="cardInfo">
            <h3>{this.state.userCard.name}</h3>
            <p>{this.state.userCard.login}</p>
            <p>{this.state.userCard.location}</p>
            <p>
              Profile:{" "}
              <a href={this.state.userCard.html_url}>
                {this.state.userCard.html_url}
              </a>
            </p>
            <p>Followers: {this.state.userCard.followers}</p>
            <p>Following: {this.state.userCard.following}</p>
            {/* <p>Bio: {this.state.userCard.bio}</p> */}
          </div>
        </div>
        <h2>Followers</h2>
        <div className="followers">
          {this.state.followers.map((follower) => (
            <div className="followerCard" key={follower.id}>
              <img src={follower.avatar_url} alt="Avatar" />
              <div className="cardInfo">
                <h3>{follower.login}</h3>
                <p>{follower.location}</p>
                <p>
                  Profile: <a href={follower.html_url}>{follower.html_url}</a>
                </p>
                <p>Followers:{follower.followers_url}</p>
                <p>Following:{follower.following_url}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
