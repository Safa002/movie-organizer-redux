import React, { Component } from "react";

import "./Favorites.css";
import { connect } from "react-redux";
import { removeMovieFromFavoriteList, postList } from "../../state/actions/dataActions";
import { Link } from "react-router-dom";

class Favorites extends Component {
  state = {
    isSbm: false,
    title: "",
  };
  favoriteChangeHandler = (e) => {
    this.setState({ title: e.target.value });
  };
  getImdbIDArray = () => {
    let favoritesIDArray = this.props.favoriteList.map((item) => {
      return item.imdbID;
    });
    return favoritesIDArray;
  };
  saveListHandler = () => {
    this.setState({ isSbm: true });
    this.props.postList(this.state.title, this.getImdbIDArray());
  };
  render() {
    const { title, isSbm } = this.state;
    return (
      <div className="favorites">
        <input
          value={title}
          className="favorites__name"
          onChange={this.favoriteChangeHandler}
          disabled={this.state.isSbm}
        />
        <ul className="favorites__list">
          {this.props.favoriteList.map((item) => {
            return (
              <li key={item.imdbID}>
                <button
                  className="remove-favorite-movie"
                  onClick={() =>
                    this.props.removeMovieFromFavoriteList(item.imdbID)
                  }
                >
                  ✖
                </button>
                {item.Title} ({item.Year})
              </li>
            );
          })}
        </ul>

        {!isSbm ? (
          <button
            type="button"
            className="favorites__save"
            onClick={this.saveListHandler}
          >
            Сохранить список
          </button>
        ) : (
          <button type="button" className="favorites__save">
            <Link
              to={"/list/" + this.props.listID}
              target="_blank"
              className="link-to__list"
            >
              Перейти к выбранным фильмам
            </Link>
          </button>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    favoritesIDArray: state.favoritesIDArray,
    listID: state.listID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovieFromFavoriteList: (id) => {
      dispatch(removeMovieFromFavoriteList(id));
    },
    postList: (title, favoritesIDArray) => {
      dispatch(postList(title, favoritesIDArray));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
