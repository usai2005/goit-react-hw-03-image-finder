import { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../../images/search_icon.svg';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = { searchQuery: '' };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.stateReset();
  };

  stateReset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.search__button}>
            <SearchIcon />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
