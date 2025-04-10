const translations = {
    en: {
        title: 'Towers of Hanoi',
        start: 'Start Game',
        moves: 'Moves',
        diskCount: 'Disk Count',
        congratulations: 'Congratulations! 🎉',
        completed: 'You solved the puzzle in',
        playAgain: 'Play Again',
        towerA: 'Source Tower',
        towerB: 'Auxiliary Tower',
        towerC: 'Target Tower'
    },
    tr: {
        title: 'Hanoi Kuleleri',
        start: 'Oyunu Başlat',
        moves: 'Hamle',
        diskCount: 'Disk Sayısı',
        congratulations: 'Tebrikler! 🎉',
        completed: 'Bulmacayı tamamladınız:',
        playAgain: 'Tekrar Oyna',
        towerA: 'Kaynak Kule',
        towerB: 'Yardımcı Kule',
        towerC: 'Hedef Kule'
    }
};

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        document.getElementById('language').value = this.currentLang;
        document.getElementById('language').addEventListener('change', (e) => {
            this.setLanguage(e.target.value);
        });
        this.updateContent();
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.updateContent();
    }

    updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key === 'completed' && element.querySelector('#finalMoves')) {
                const moves = element.querySelector('#finalMoves').textContent;
                element.innerHTML = `${translations[this.currentLang][key]} <span id="finalMoves">${moves}</span>`;
            } else {
                element.textContent = translations[this.currentLang][key] || key;
            }
        });
    }

    getText(key) {
        return translations[this.currentLang][key] || key;
    }
}

const i18n = new I18n(); 