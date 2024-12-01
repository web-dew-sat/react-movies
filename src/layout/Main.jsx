// Импортируем необходимые компоненты
import { Movies } from "../components/Movies"; // Компонент для отображения списка фильмов
import React, { Component } from "react";
import Preloader from "../components/Preloader"; // Компонент загрузчика
import Search from "../components/Search"; // Компонент поиска
import Pagination from "../components/Pagination"; // Компонент пагинации

// Получаем ключ API из переменных окружения
const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends Component {
    // Инициализируем начальное состояние компонента
    state = {
        movies: [], // Список фильмов
        loading: true, // Флаг для отображения загрузчика
        totalMovies: 0, // Общее количество фильмов
        searchQuery: 'matrix', // Текущий поисковый запрос
        searchType: 'all', // Текущий фильтр по типу (например, все, фильмы, сериалы)
        currentPage: 1, // Текущая страница
    };

    // Метод, который вызывается сразу после монтирования компонента
    componentDidMount() {
        // Выполняем поиск фильмов с начальным запросом
        this.searchMovies(this.state.searchQuery, this.state.searchType, this.state.currentPage);
    }

    // Метод для выполнения поиска фильмов
    searchMovies = (value, type = 'all', page = 1) => {
        // Обновляем состояние для отображения загрузчика и новых параметров поиска
        this.setState({ loading: true, searchQuery: value, searchType: type, currentPage: page });

        // Отправляем запрос к API с переданными параметрами
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${value}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`)
            .then((res) => res.json()) // Парсим JSON-ответ
            .then((data) =>
                this.setState({
                    movies: data.Search, // Обновляем список фильмов
                    loading: false, // Выключаем загрузчик
                    totalMovies: data.totalResults, // Сохраняем общее количество фильмов
                })
            )
            .catch((err) => {
                console.error(err); // Логируем ошибку, если запрос не удался
                this.setState({ loading: false }); // Выключаем загрузчик
            });
    };

    // Метод для обработки смены страницы
    handlePageChange = (page) => {
        // Выполняем поиск фильмов для выбранной страницы
        this.searchMovies(this.state.searchQuery, this.state.searchType, page);
    };

    render() {
        // Деструктурируем значения из состояния
        const { movies, loading, totalMovies, currentPage } = this.state;

        return (
            <main className="content container">
                {/* Компонент поиска с передачей метода для выполнения поиска */}
                <Search searchMovies={this.searchMovies} totalMovies={this.state.totalMovies} />

                {/* Если идет загрузка, отображаем Preloader, иначе список фильмов */}
                {loading ? (
                    <Preloader />
                ) : (
                    <Movies movies={movies} />
                )}

                {/* Отображаем компонент пагинации, если фильмов больше чем на одну страницу */}
                {totalMovies > 10 && (
                    <Pagination
                        totalMovies={totalMovies} // Общее количество фильмов
                        currentPage={currentPage} // Текущая страница
                        onPageChange={this.handlePageChange} // Метод для смены страницы
                        searchQuery={this.state.searchQuery} // Текущий запрос
                        searchType={this.state.searchType} // Текущий фильтр по типу
                    />
                )}
            </main>
        );
    }
}

export default Main;
