// Импортируем React
import React, {useState} from 'react';
import './Search.css'

const Search = (props) => {

    const {
        searchMovies = Function.prototype,
        totalMovies = 0
    } = props

    const [searchQuery, setSearchQuery] = useState('matrix');

    const [searchType, setSearchType] = useState('all');

    // Метод для обработки смены фильтра (тип контента)
    const handleFilter = (e) => {
        // Обновляем состояние с новым типом
        setSearchType(e.target.dataset.type);
        searchMovies(searchQuery, e.target.dataset.type);
    };

    return (
        <div className="row">
            {/* Поле ввода для поиска */}
            <div className="col s12">
                <div className="input-field">
                    <input
                        type="search" // Тип поля — поиск
                        className="validate" // Класс валидации
                        placeholder={'search'} // Подсказка в поле ввода
                        value={searchQuery} // Текущее значение поиска
                        onChange={(e) => setSearchQuery(e.target.value)} // Обновление состояния при вводе
                    />
                    <button
                        className="btn search-btn" // Класс кнопки
                        onClick={(e) => searchMovies(searchQuery, searchType)} // Вызов метода поиска из `props`
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
                        onChange={handleFilter} // Обработчик изменения
                        checked={searchType === 'all'} // Устанавливаем активное состояние
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
                        onChange={handleFilter}
                        checked={searchType === 'movie'}
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
                        onChange={handleFilter}
                        checked={searchType === 'series'}
                    />
                    <span>Series</span>
                </label>

                <label>
                    <input
                        className="with-gap"
                        name="type"
                        value={'game'}
                        type="radio"
                        data-type="game"
                        onChange={handleFilter}
                        checked={searchType === 'game'}
                    />
                    <span>Game</span>
                </label>
            </div>

            {/* Отображение общего количества найденных фильмов */}
            <div className="col s12">
                <p className="total">
                    {totalMovies > 0 ? `Total found: ${totalMovies}` : ""}
                </p>

            </div>
        </div>
    );
}

// Экспортируем компонент для использования в других частях приложения
export default Search;
