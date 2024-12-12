// Импортируем необходимые компоненты
import './Main.css'
import React, {useState, useEffect} from "react";
import {Movies} from "../../components/Movies/Movies"; // Компонент для отображения списка фильмов
import Preloader from "../../components/Preloader/Preloader"; // Компонент загрузчика
import Search from "../../components/Search/Search"; // Компонент поиска
import Pagination from "../../components/Pagination/Pagination"; // Компонент пагинации



// Получаем ключ API из переменных окружения
const API_KEY = process.env.REACT_APP_API_KEY;

const Main = () => {
    // Инициализируем начальное состояние компонента
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalMovies, setTotalMovies] = useState(0)
    const [searchQuery, setSearchQuery] = useState('matrix');
    const [searchType, setSearchType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Метод для выполнения поиска фильмов
    const searchMovies = (value, type = 'all', page = 1) => {
        // Обновляем состояние для отображения загрузчика и новых параметров поиска
        setLoading(true);
        setSearchQuery(value);
        setSearchType(type);
        setCurrentPage(page)

        // Отправляем запрос к API с переданными параметрами
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${value}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`)
            .then((res) => res.json()) // Парсим JSON-ответ
            .then((data) => {
                    setMovies(data.Search);
                    setLoading(false);
                    setTotalMovies(data.totalResults);
                }
            )
            .catch((err) => {
                console.error(err); // Логируем ошибку, если запрос не удался
                setLoading(false);
            });
    };

    // Метод для обработки смены страницы
    const handlePageChange = (page) => {
        // Выполняем поиск фильмов для выбранной страницы
        searchMovies(searchQuery, searchType, page);
    };

    // Метод, который вызывается сразу после монтирования компонента
    useEffect(() => {
        // Выполняем поиск фильмов с начальным запросом
        searchMovies(searchQuery, searchType, currentPage);
    }, [])

    return (
        <main className="content container">
            {/* Компонент поиска с передачей метода для выполнения поиска */}
            <Search searchMovies={searchMovies} totalMovies={totalMovies}/>

            {/* Если идет загрузка, отображаем Preloader, иначе список фильмов */}
            {loading ? (
                <Preloader/>
            ) : (
                <Movies movies={movies}/>
            )}

            {/* Отображаем компонент пагинации, если фильмов больше чем на одну страницу */}
            {totalMovies > 10 && (
                <Pagination
                    totalMovies={totalMovies} // Общее количество фильмов
                    currentPage={currentPage} // Текущая страница
                    onPageChange={handlePageChange} // Метод для смены страницы
                />
            )}
        </main>
    );

}

export default Main;
