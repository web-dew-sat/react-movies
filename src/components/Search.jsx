import React from 'react';

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            type: 'all'
        };
    }

    handleFilter = (e) => {
        this.setState(() => ({type: e.target.dataset.type}), () => {
            this.props.searchMovies(this.state.search, this.state.type);
        });

    }

    render() {
        return <div className="row">
            <div className="col s12">
                <div className="input-field">
                    <input
                        type="search"
                        className="validate"
                        placeholder={'search'}
                        value={this.state.search}
                        onChange={(e) => this.setState({search: e.target.value})}
                    />
                    <button
                        className="btn search-btn"
                        onClick={(e) => this.props.searchMovies(this.state.search, this.state.type)}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="col s12">

                <label>
                    <input
                        className="with-gap"
                        name="type"
                        value=''
                        type="radio"
                        data-type="all"
                        onChange={this.handleFilter}
                        checked={this.state.type === 'all'}
                    />
                    <span>All </span>
                </label>

                <label>
                    <input
                        className="with-gap"
                        name="type"
                        value={'movie'}
                        type="radio"
                        data-type="movie"
                        onChange={this.handleFilter}
                        checked={this.state.type === 'movie'}
                    />
                    <span>Movie</span>
                </label>

                <label>
                    <input
                        className="with-gap"
                        name="type"
                        value={'series'}
                        type="radio"
                        data-type="series"
                        onChange={this.handleFilter}
                        checked={this.state.type === 'series'}
                    />
                    <span>Series</span>
                </label>

            </div>
        </div>
    }
}

export default Search;
