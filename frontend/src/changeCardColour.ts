import { Card } from "./classes/card";

export function changeColourToGreen(card: Card) {
  card.cardElement.classList.add("correct");
}
export function changeColourToRed(card: Card) {
  card.cardElement.classList.add("incorrect");
}
