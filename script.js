const characters = ['✤', '⋆', '₊', '°', '⊹', '★','⭐', '🪐', '⭑', '⋆', '｡', '⊹', '࣪', '◌'];
const maxCharacters = 150;

function randomPosition(maxX) {
    return Math.floor(Math.random() * maxX);
}

function randomRotation() {
    return Math.random() * 4 + 1;
}

function randomSize() {
    return Math.floor(Math.random() * 20) + 10;
}

function randomOpacity() {
    return Math.random() * 0.5 + 0.5;
}

function createCharacter() {
    const character = document.createElement('div');
    character.classList.add('falling-character');
    character.textContent = characters[Math.floor(Math.random() * characters.length)];
    const positionX = randomPosition(window.innerWidth);
    const positionY = -50;
    const size = randomSize();
    character.style.left = positionX + 'px';
    character.style.top = positionY + 'px';
    character.style.fontSize = size + 'px';
    character.style.opacity = randomOpacity();
    character.rotation = randomRotation();
    return character;
}

function animateCharacter(character) {
    const fall = setInterval(() => {
        const currentTop = parseFloat(character.style.top);
        if (currentTop >= window.innerHeight) {
            clearInterval(fall);
            character.remove();
            const newCharacter = createCharacter();
            document.querySelector('.matrix-container').appendChild(newCharacter);
            animateCharacter(newCharacter);
        } else {
            character.style.top = (currentTop + 2) + 'px';
            character.style.transform = `rotate(${parseFloat(character.style.transform ? character.style.transform.replace('rotate(', '').replace('deg)', '') : 0) + character.rotation}deg)`;
        }
    }, 50);
}

function startMatrix() {
    setInterval(() => {
        const existingCharacters = document.querySelectorAll('.falling-character');
        if (existingCharacters.length < maxCharacters) {
            const character = createCharacter();
            document.querySelector('.matrix-container').appendChild(character);
            animateCharacter(character);
        }
    }, 100);
}

window.onload = startMatrix;
