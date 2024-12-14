document.addEventListener('DOMContentLoaded', () => {
    // Tableau contenant les cartes du jeu de mémoire, chaque carte est présente en double
    const cardsArray = [
        { name: '1', img: 'images/1.jpg' },
        { name: '1', img: 'images/1.jpg' },
        { name: '2', img: 'images/2.jpg' },
        { name: '2', img: 'images/2.jpg' },
        { name: '3', img: 'images/3.jpg' },
        { name: '3', img: 'images/3.jpg' },
        { name: '4', img: 'images/4.jpg' },
        { name: '4', img: 'images/4.jpg' },
        { name: '5', img: 'images/Miss.jpg' },
        { name: '5', img: 'images/Miss.jpg' },
        { name: '6', img: 'images/Ruby.jpg' },
        { name: '6', img: 'images/Ruby.jpg' }
    ];

    // Sélectionne l'élément du DOM où le jeu sera affiché
    const game = document.querySelector('#memory-game');
    const gameOverMessage = document.querySelector('#game-over');
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedPairs = 0;
    let moves = 0;

    // Fonction pour créer le plateau de jeu
    function createBoard() {
        // Mélange les cartes de manière aléatoire
        cardsArray.sort(() => 0.5 - Math.random());
        cardsArray.forEach(card => {
            // Crée un élément div pour chaque carte
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.name = card.name;

            // Crée les faces avant et arrière de la carte
            const frontFace = document.createElement('img');
            frontFace.classList.add('front-face');
            frontFace.src = card.img;

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');
            backFace.textContent = "?";

            // Ajoute les faces à l'élément de la carte
            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            game.appendChild(cardElement);

            // Ajoute un écouteur d'événement pour retourner la carte
            cardElement.addEventListener('click', flipCard);
        });

        // Rendre les cartes visibles pendant quelques secondes
        setTimeout(() => {
            document.querySelectorAll('.memory-card').forEach(card => {
                card.classList.remove('flip');
            });
        }, 3000); // Temps en millisecondes pendant lequel les cartes sont visibles
    }

    // Fonction pour retourner une carte
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');
        moves++;

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Fonction pour vérifier si les cartes retournées correspondent
    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    // Fonction pour désactiver les cartes correspondantes
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();

        matchedPairs++;
        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(() => {
                localStorage.setItem('score', moves);
                window.location.href = 'resultat.html';
            }, 1000); // Délai avant de rediriger vers la page de résultats
        }
    }

    // Fonction pour retourner les cartes qui ne correspondent pas
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    // Fonction pour réinitialiser le plateau de jeu
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Appelle la fonction pour créer le plateau de jeu
    createBoard();
});
