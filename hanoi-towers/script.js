class TowersOfHanoi {
    constructor() {
        this.towers = [[], [], []];
        this.selectedDisk = null;
        this.moves = 0;
        this.gameStarted = false;
        this.diskColors = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63', '#9C27B0', '#FF5722'];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
    }

    setupEventListeners() {
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('playAgain').addEventListener('click', () => this.resetGame());
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        document.querySelectorAll('.tower').forEach(tower => {
            tower.addEventListener('click', (e) => this.handleTowerClick(e));
            tower.addEventListener('dragover', (e) => this.handleDragOver(e));
            tower.addEventListener('drop', (e) => this.handleDrop(e));
        });

        window.addEventListener('resize', () => this.updateDiskSizes());
    }

    setupTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.className = theme;
    }

    toggleTheme() {
        const newTheme = document.body.className === 'light' ? 'dark' : 'light';
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    }

    calculateDiskWidth(size, totalDisks) {
        const gameContainer = document.querySelector('.game-container');
        const containerWidth = gameContainer.clientWidth;

        const towerSpacing = containerWidth / 4;
        const towerWidth = 20;

        const maxAllowedWidth = towerSpacing * 1.8;

        const baseWidth = Math.max(40, towerSpacing * 0.3);

        let multiplier;
        switch (totalDisks) {
            case 3:
                multiplier = 0.4;
                break;
            case 4:
                multiplier = 0.35;
                break;
            case 5:
                multiplier = 0.3;
                break;
            case 6:
                multiplier = 0.25;
                break;
            default:
                multiplier = 0.35;
        }

        const width = baseWidth + (baseWidth * multiplier * (size - 1));

        return Math.min(maxAllowedWidth, Math.max(baseWidth, width));
    }

    updateDiskSizes() {
        if (!this.gameStarted) return;

        const diskCount = parseInt(document.getElementById('diskCount').value);
        document.querySelectorAll('.disk').forEach((disk, index) => {
            const size = diskCount - index;
            const width = this.calculateDiskWidth(size, diskCount);
            disk.style.width = `${width}px`;
        });
    }

    startGame() {
        const diskCount = parseInt(document.getElementById('diskCount').value);
        this.resetGame();
        this.createDisks(diskCount);
        this.gameStarted = true;
    }

    resetGame() {
        this.towers = [[], [], []];
        this.moves = 0;
        this.selectedDisk = null;
        this.gameStarted = false;
        this.updateMoveCount();
        document.querySelectorAll('.tower').forEach(tower => {
            const label = tower.querySelector('.tower-label');
            tower.innerHTML = '';
            tower.appendChild(label);
        });
        document.getElementById('winMessage').classList.add('hidden');
    }

    createDisks(count) {
        for (let i = count; i > 0; i--) {
            const disk = document.createElement('div');
            disk.className = 'disk';
            disk.draggable = true;
            disk.style.width = `${this.calculateDiskWidth(i, count)}px`;
            disk.style.backgroundColor = this.diskColors[i - 1];

            disk.addEventListener('dragstart', (e) => this.handleDragStart(e, i));
            disk.addEventListener('dragend', () => this.handleDragEnd());

            this.towers[0].push(i);
            document.querySelector('[data-tower="1"]').appendChild(disk);
        }
    }

    handleDragStart(e, diskValue) {
        if (!this.gameStarted) {
            e.preventDefault();
            return;
        }

        const tower = e.target.parentElement;
        const towerIndex = parseInt(tower.getAttribute('data-tower')) - 1;
        const topDisk = this.towers[towerIndex][this.towers[towerIndex].length - 1];

        if (diskValue !== topDisk) {
            e.preventDefault();
            return;
        }

        this.selectDisk(towerIndex);
        e.target.classList.add('dragging');
    }

    handleDragOver(e) {
        if (!this.gameStarted || !this.selectedDisk) return;
        e.preventDefault();
    }

    handleDrop(e) {
        if (!this.gameStarted || !this.selectedDisk) return;
        e.preventDefault();

        const tower = e.currentTarget;
        const toTower = parseInt(tower.getAttribute('data-tower')) - 1;

        this.moveDisk(toTower);
    }

    handleDragEnd() {
        if (this.selectedDisk) {
            this.selectedDisk.element.classList.remove('dragging');
            this.selectedDisk.element.classList.remove('selected');
            this.selectedDisk = null;
        }
    }

    handleTowerClick(e) {
        if (!this.gameStarted) return;

        const tower = e.currentTarget;
        const towerIndex = parseInt(tower.getAttribute('data-tower')) - 1;

        if (this.selectedDisk === null) {
            if (this.towers[towerIndex].length === 0) return;
            this.selectDisk(towerIndex);
        } else {
            this.moveDisk(towerIndex);
        }
    }

    selectDisk(towerIndex) {
        const topDisk = tower => tower[tower.length - 1];
        const diskElement = document.querySelector(`[data-tower="${towerIndex + 1}"] .disk:last-child`);

        if (diskElement) {
            this.selectedDisk = {
                value: topDisk(this.towers[towerIndex]),
                fromTower: towerIndex,
                element: diskElement
            };
            diskElement.classList.add('selected');
        }
    }

    moveDisk(toTower) {
        const canMove = this.towers[toTower].length === 0 ||
            this.towers[toTower][this.towers[toTower].length - 1] > this.selectedDisk.value;

        if (canMove) {
            this.towers[this.selectedDisk.fromTower].pop();
            this.towers[toTower].push(this.selectedDisk.value);

            const targetTower = document.querySelector(`[data-tower="${toTower + 1}"]`);
            targetTower.appendChild(this.selectedDisk.element);

            this.moves++;
            this.updateMoveCount();

            if (this.checkWin()) {
                this.showWinMessage();
            }
        }

        this.selectedDisk.element.classList.remove('selected');
        this.selectedDisk.element.classList.remove('dragging');
        this.selectedDisk = null;
    }

    updateMoveCount() {
        document.getElementById('moveCount').textContent = this.moves;
    }

    checkWin() {
        return this.towers[2].length === parseInt(document.getElementById('diskCount').value);
    }

    showWinMessage() {
        document.getElementById('finalMoves').textContent = this.moves;
        document.getElementById('winMessage').classList.remove('hidden');
        this.gameStarted = false;
    }
}

new TowersOfHanoi(); 