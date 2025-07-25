import { Card } from "./card";
import { Score } from "./score";
import { fetchGameCardsFromApi } from "../imageLoaderFromApi";
import { fetchGameCardsFromDB } from "../imageLoaderFromDB";

export class Board {
  private gameBoard: HTMLElement;
  private numberOfCards: HTMLSelectElement;
  private maxSelectableCards: HTMLElement;
  private clickedCards: string[] = [];
  private indexOfClickedCards: number[] = [];
  private score: Score;

  constructor(
    gameboardId: string,
    numberOfCardsId: string,
    maxSelectableCards: string,
    resetButtonId: string,
    scoreELementId: string
  ) {
    this.gameBoard = document.getElementById(gameboardId) as HTMLElement;
    this.numberOfCards = document.getElementById(numberOfCardsId) as HTMLSelectElement;
    this.maxSelectableCards = document.getElementById(maxSelectableCards) as HTMLElement;
    this.score = new Score(scoreELementId);

    this.init();
    this.resetButtonListener(resetButtonId);
  }

  private init() {
    this.generateCards(16);
    this.fetchGameCards();
    console.log(localStorage.getItem("selectedApi"));
  }

  private resetButtonListener(resetButtonId: string) {
    const resetButton = document.getElementById(resetButtonId) as HTMLButtonElement;

    resetButton.addEventListener("click", () => {
      this.resetGame();
    });
  }

  private generateCards(count: number) {
    for (let i = 0; i < count; i++) {
      const cardElement = Card.createCardElement(i);
      const card = new Card(cardElement);
      this.gameBoard.appendChild(cardElement);
      cardElement.addEventListener("click", () => this.handleCardClick(card));
    }
  }

  private async fetchGameCards() {
    if (window.mode === "api") {
      await fetchGameCardsFromApi();
    } else {
      await fetchGameCardsFromDB();
    }
  }

  public getSelectedCards(): string[] {
    if (this.clickedCards.length === 0) {
      return [];
    }
    return [...this.clickedCards];
  }

  public getSelectedCardIndices(): number[] | null {
    // fix dat deze een htmlelement en een nummer kan nemen als parameter
    const selectedValue = parseInt(this.numberOfCards.value, 10);
    if (this.indexOfClickedCards.length !== selectedValue) {
      return null;
    }
    return [...this.indexOfClickedCards]; // Returns a shallow copy of the indexOfClickedCards array
  }

  private isCardSelected(cardName: string): boolean {
    return this.clickedCards.includes(cardName);
  }

  private toggleCardSelection(card: Card, cardName: string) {
    if (this.isCardSelected(cardName)) {
      const index = this.clickedCards.indexOf(cardName);
      this.clickedCards.splice(index, 1); // Remove card from the array
      this.indexOfClickedCards.splice(index, 1);
      card.cardElement.classList.remove("clicked"); // Remove visual border
      this.score.updateScore(this.clickedCards.length);
      console.log(`Clicked cards: ${this.clickedCards.join(", ")}`);
    } else {
      this.clickedCards.push(cardName); // Add card to the array
      this.indexOfClickedCards.push(
        parseInt(card.cardElement.getAttribute("data-name") || "0", 10)
      );
      this.score.updateScore(this.clickedCards.length);
      card.cardElement.classList.add("clicked"); // Add visual border
      console.log(`Clicked cards: ${this.clickedCards.join(", ")}`);
    }
  }

  public handleCardClick(card: Card) {
    const cardName = card.cardElement.getAttribute("data-name");

    if (card.cardElement.classList.contains("big")) {
      return;
    }
    console.log(this.score.getScore());
    // Prevent adding more than the selected number of cards

    if (window.mode === "api") {
      const selectedValue = this.numberOfCards ? parseInt(this.numberOfCards.value, 10) : 16;
      if (this.clickedCards.length >= selectedValue && !this.isCardSelected(cardName || "")) {
        console.log(`You can only select up to ${selectedValue} cards.`);
        return;
      }
    } else {
      console.log(this.maxSelectableCards.innerText);
      const selectableCards = this.maxSelectableCards
        ? parseInt(this.maxSelectableCards.innerText, 10)
        : 4;
      if (this.clickedCards.length >= selectableCards && !this.isCardSelected(cardName || "")) {
        console.log(`You can only select up to ${selectableCards} cards.`);
        return;
      }
    }
    // Select the card
    if (cardName) {
      this.toggleCardSelection(card, cardName);
    }
  }

  public async resetGame() {
    window.UIManager.setResetButtonLoading(true);
    this.clickedCards.length = 0;
    this.indexOfClickedCards.length = 0;
    this.score.resetScore();
    const cards = document.querySelectorAll(".card");
    cards.forEach((cardElement) => {
      const card = new Card(cardElement as HTMLElement);
      card.resetCard();
    });
    await this.fetchGameCards();
    window.UIManager.setResetButtonLoading(false);
  }
}
