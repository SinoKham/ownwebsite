//КОМПОНЕНТ ДЛЯ КАРТОЧЕК ПРОЕКТОВ

export class ProjectCard {
    constructor(project) {
        this.project = project;
    }
    
    /**
     * Преобразовать данные проекта в HTML
     */
    render() {
        const techTags = this.project.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');
        
        return `
            <div class="project-card" data-project-id="${this.project.id}">
                <h3>${this.project.title}</h3>
                <p>${this.project.description}</p>
                <p><strong>Год:</strong> ${this.project.year}</p>
                <p><strong>Описание:</strong> ${this.project.details}</p>
                ${this.project.status ? `<p><strong>Статус:</strong> ${this.project.status}</p>` : ''}
                <div class="tech-stack">
                    ${techTags}
                </div>
            </div>
        `;
    }
}

export class ProjectCardList {
    constructor(projects = []) {
        this.projects = projects;
        this.filteredProjects = [...this.projects];
    }
    
    /**
     * Фильтровать проекты по названию
     */
    filterByName(searchTerm) {
        this.filteredProjects = this.projects.filter(project =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return this;
    }
    
    /**
     * Фильтровать проекты по технологиям
     */
    filterByTechnology(tech) {
        this.filteredProjects = this.projects.filter(project =>
            project.technologies.some(t => t.toLowerCase() === tech.toLowerCase())
        );
        return this;
    }
    
    /**
     * Фильтровать проекты по статусу
     */
    filterByStatus(status) {
        this.filteredProjects = this.projects.filter(project =>
            !status || project.status === status
        );
        return this;
    }
    
    /**
     * Сортировать по году
     */
    sortByYear(order = 'desc') {
        this.filteredProjects.sort((a, b) => {
            return order === 'asc' ? a.year - b.year : b.year - a.year;
        });
        return this;
    }
    
    /**
     * Сортировать по названию
     */
    sortByTitle(order = 'asc') {
        this.filteredProjects.sort((a, b) => {
            const nameA = a.title.toLowerCase();
            const nameB = b.title.toLowerCase();
            return order === 'asc' 
                ? nameA.localeCompare(nameB) 
                : nameB.localeCompare(nameA);
        });
        return this;
    }
    
    /**
     * Получить отфильтрованные и отсортированные проекты
     */
    getProjects() {
        return this.filteredProjects;
    }
    
    /**
     * Рендерить все карточки
     */
    renderAll() {
        return this.filteredProjects
            .map(project => new ProjectCard(project).render())
            .join('');
    }
    
    /**
     * Сбросить фильтры
     */
    reset() {
        this.filteredProjects = [...this.projects];
        return this;
    }
}

export default ProjectCard;
