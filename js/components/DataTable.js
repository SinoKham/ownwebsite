//КОМПОНЕНТ ДЛЯ ТАБЛИЦ

export class DataTable {
    constructor(data = [], columns = []) {
        this.data = data;
        this.columns = columns;
        this.filteredData = [...this.data];
        this.sortColumn = null;
        this.sortOrder = 'asc';
    }
    
    /**
     * Установить данные
     */
    setData(data) {
        this.data = data;
        this.filteredData = [...this.data];
        return this;
    }
    
    /**
     * Установить колонки
     */
    setColumns(columns) {
        this.columns = columns;
        return this;
    }
    
    /**
     * Фильтровать данные по значению в колонке
     */
    filter(columnKey, searchValue) {
        this.filteredData = this.data.filter(row => {
            const value = row[columnKey];
            return value && value.toString().toLowerCase().includes(searchValue.toLowerCase());
        });
        return this;
    }
    
    /**
     * Сортировать по колонке
     */
    sort(columnKey, order = 'asc') {
        this.sortColumn = columnKey;
        this.sortOrder = order;
        
        this.filteredData.sort((a, b) => {
            const valA = a[columnKey];
            const valB = b[columnKey];
            
            if (typeof valA === 'number' && typeof valB === 'number') {
                return order === 'asc' ? valA - valB : valB - valA;
            }
            
            const strA = valA.toString().toLowerCase();
            const strB = valB.toString().toLowerCase();
            return order === 'asc' 
                ? strA.localeCompare(strB) 
                : strB.localeCompare(strA);
        });
        
        return this;
    }
    
    /**
     * Получить отфильтрованные данные
     */
    getData() {
        return this.filteredData;
    }
    
    /**
     * Сбросить фильтры
     */
    reset() {
        this.filteredData = [...this.data];
        this.sortColumn = null;
        this.sortOrder = 'asc';
        return this;
    }
    
    /**
     * Рендерить таблицу
     */
    render() {
        const headerRow = this.columns
            .map(col => `<th>${col.label}</th>`)
            .join('');
        
        const dataRows = this.filteredData
            .map(row => {
                const cells = this.columns
                    .map(col => {
                        let value = row[col.key];
                        if (col.render) {
                            value = col.render(value, row);
                        }
                        return `<td>${value}</td>`;
                    })
                    .join('');
                return `<tr>${cells}</tr>`;
            })
            .join('');
        
        return `
            <table>
                <thead>
                    <tr>${headerRow}</tr>
                </thead>
                <tbody>
                    ${dataRows || '<tr><td colspan="' + this.columns.length + '">Нет данных</td></tr>'}
                </tbody>
            </table>
        `;
    }
    
    /**
     * Загрузить данные асинхронно
     */
    async loadData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            const data = await response.json();
            this.setData(data);
            return data;
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            return null;
        }
    }
}

export default DataTable;
