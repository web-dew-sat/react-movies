// Импортируем React
import React from 'react';

class Search extends React.Component {

    state = {
        search: 'matrix', // Начальное значение поискового запроса
        type: 'all', // Начальный фильтр (все типы контента)
    }

    // Метод для обработки смены фильтра (тип контента)
    handleFilter = (e) => {
        // Обновляем состояние с новым типом
        this.setState(() => ({ type: e.target.dataset.type }), () => {
            // После обновления состояния вызываем метод поиска из `props`
            this.props.searchMovies(this.state.search, this.state.type);
        });
    };

    render() {
        // Деструктурируем значения из состояния
        const { search, type } = this.state;

        return (
            <div className="row">
                {/* Поле ввода для поиска */}
                <div className="col s12">
                    <div className="input-field">
                        <input
                            type="search" // Тип поля — поиск
                            className="validate" // Класс валидации
                            placeholder={'search'} // Подсказка в поле ввода
                            value={this.state.search} // Текущее значение поиска
                            onChange={(e) => this.setState({ search: e.target.value })} // Обновление состояния при вводе
                        />
                        <button
                            className="btn search-btn" // Класс кнопки
                            onClick={(e) => this.props.searchMovies(search, type)} // Вызов метода поиска из `props`
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Радио-кнопки для выбора типа контента */}
                <div className="col s12">
                    {/* Радио-кнопка для выбора всех типов контента */}
                    <label>
                        <input
                            className="with-gap" // Радио-кнопка с промежутком
                            name="type" // Имя группы кнопок
                            value='' // Значение
                            type="radio" // Тип радио
                            data-type="all" // Тип контента
                            onChange={this.handleFilter} // Обработчик изменения
                            checked={type === 'all'} // Устанавливаем активное состояние
                        />
                        <span>All </span>
                    </label>

                    {/* Радио-кнопка для фильтра по фильмам */}
                    <label>
                        <input
                            className="with-gap"
                            name="type"
                            value={'movie'}
                            type="radio"
                            data-type="movie"
                            onChange={this.handleFilter}
                            checked={type === 'movie'}
                        />
                        <span>Movie</span>
                    </label>

                    {/* Радио-кнопка для фильтра по сериалам */}
                    <label>
                        <input
                            className="with-gap"
                            name="type"
                            value={'series'}
                            type="radio"
                            data-type="series"
                            onChange={this.handleFilter}
                            checked={type === 'series'}
                        />
                        <span>Series</span>
                    </label>
                </div>

                {/* Отображение общего количества найденных фильмов */}
                <div className="col s12">
                    <p className="total">
                        {this.props.totalMovies > 0 ? `Total found: ${this.props.totalMovies}` : ""}
                    </p>

                </div>
            </div>
        );
    }
}

// Экспортируем компонент для использования в других частях приложения
export default Search;
