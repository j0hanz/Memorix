export function updateCardStatus<T extends { status: string }>(
  cards: T[],
  index: number,
  status: string,
): T[] {
  const updated = [...cards];
  updated[index] = { ...updated[index], status };
  return updated;
}

// Update the status of multiple cards in the array
export function updateMultipleCardStatus<T extends { status: string }>(
  cards: T[],
  indexes: number[],
  status: string,
): T[] {
  const updated = [...cards];
  indexes.forEach((index) => {
    if (index !== null && updated[index]) {
      updated[index] = { ...updated[index], status };
    }
  });
  return updated;
}

// Update the status of all cards in the array
export function updateAllCardsStatus<T extends { status: string }>(
  cards: T[],
  status: string,
): T[] {
  return cards.map((card) => ({ ...card, status }));
}
