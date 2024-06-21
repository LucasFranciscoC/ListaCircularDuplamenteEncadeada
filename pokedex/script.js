// script.js

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(data) {
        const newNode = new Node(data);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    remove(data) {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                if (current.prev !== null) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next;
                }
                if (current.next !== null) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev;
                }
                return true; // Pokémon encontrado e removido
            }
            current = current.next;
        }
        return false; // Pokémon não encontrado
    }

    display() {
        const pokedexList = document.getElementById('pokedex-list');
        pokedexList.innerHTML = '';
        let current = this.head;
        while (current !== null) {
            const pokemonDiv = document.createElement('div');
            pokemonDiv.className = 'pokemon';

            const pokemonName = document.createElement('span');
            pokemonName.textContent = current.data;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => {
                this.remove(pokemonName.textContent); // Usar pokemonName.textContent
                this.display();
            });

            pokemonDiv.appendChild(pokemonName);
            pokemonDiv.appendChild(removeButton);
            pokedexList.appendChild(pokemonDiv);

            current = current.next;
        }
    }
}

const pokedex = new DoublyLinkedList();

document.getElementById('pokedex-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('pokemon-name').value;
    if (pokemonName) {
        pokedex.append(pokemonName);
        pokedex.display();
        document.getElementById('pokemon-name').value = '';
    }
});
