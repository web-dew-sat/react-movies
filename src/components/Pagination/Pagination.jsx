import './Pagination.css'

// Импортируем React и базовый класс Component
import React, { Component } from "react";

class Pagination extends Component {
    // Метод для обработки клика на элемент пагинации
    handlePageChange = (e) => {
        e.preventDefault(); // Отменяем стандартное действие браузера
        const page = Number(e.target.dataset.page); // Получаем номер страницы из data-page
        this.props.onPageChange(page); // Сообщаем родительскому компоненту о смене страницы
    };

    // Метод для генерации элементов пагинации
    showPage = () => {
        const items = []; // Массив для хранения элементов пагинации
        const totalPages = Math.ceil(this.props.totalMovies / 10); // Рассчитываем общее количество страниц

        // Цикл для создания элементов пагинации
        for (let i = 1; i <= totalPages; i++) {
            // Определяем класс элемента (активный или обычный)
            const itemClass = i === this.props.currentPage ? 'active' : 'waves-effect';

            // Добавляем элемент списка в массив
            items.push(
                <li
                    key={i} // Уникальный ключ для каждого элемента
                    className={itemClass} // Класс элемента
                    data-page={i} // Номер страницы (передается через data атрибут)
                    onClick={this.handlePageChange} // Обработчик клика
                >
                    {i} {/* Отображаем номер страницы */}
                </li>
            );
        }

        return items; // Возвращаем массив элементов
    };

    render() {
        // Рендерим список элементов пагинации
        return <ul className="pagination">{this.showPage()}</ul>;
    }
}

// Экспортируем компонент для использования в других частях приложения
export default Pagination;
