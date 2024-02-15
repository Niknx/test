import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useHomeStore = defineStore("home", () => {
  function generateId() {
    return Math.random().toString(36).slice(2, 9);
  }

  const cards = ref([
    {
      id: generateId(),
      content: "Mastercard",
      number: "1",
      isOpen: false,
      data: [
        {
          id: generateId(),
          number: "1.1",
          text: "Максимал фойда (Нац. валюта)",
        },
        { id: generateId(), number: "1.2", text: "On-line (Нац. валюта)" },
        { id: generateId(), number: "1.3", text: "Аванс (Нац. валюта)" },
        {
          id: generateId(),
          number: "1.4",
          text: "Максимал фойда (Ин. валюта)",
        },
        { id: generateId(), number: "1.5", text: "On-line (Ин. валюта)" },
        { id: generateId(), number: "1.6", text: "Аванс (Ин. валюта)" },
        {
          id: generateId(),
          number: "1.7",
          text: "Максимал фойда (Нац. валюта)",
        },
        { id: generateId(), number: "1.8", text: "On-line (Нац. валюта)" },
        { id: generateId(), number: "1.9", text: "Аванс (Нац. валюта)" },
        {
          id: generateId(),
          number: "1.10",
          text: "Максимал фойда (Ин. валюта)",
        },
        { id: generateId(), number: "1.11", text: "On-line (Ин. валюта)" },
        { id: generateId(), number: "1.12", text: "Аванс (Ин. валюта)" },
      ],
    },
    {
      id: generateId(),
      content: "вклады",
      number: "2",
      isOpen: false,
      data: [
        {
          id: generateId(),
          number: "2.1",
          text: "Максимал фойда (Нац. валюта)",
        },
        { id: generateId(), number: "2.2", text: "On-line (Нац. валюта)" },
        { id: generateId(), number: "2.3", text: "Аванс (Нац. валюта)" },
        {
          id: generateId(),
          number: "2.4",
          text: "Максимал фойда (Ин. валюта)",
        },
        { id: generateId(), number: "2.5", text: "On-line (Ин. валюта)" },
        { id: generateId(), number: "2.6", text: "Аванс (Ин. валюта)" },
      ],
    },
    {
      id: generateId(),
      content: "ОТправка в чат бот",
      number: "3",
      isOpen: false,
      data: [],
    },
    {
      id: generateId(),
      content: "Кредиты",
      number: "4",
      isOpen: false,
      data: [
        {
          id: generateId(),
          number: "4.1",
          text: "Максимал фойда (Нац. валюта)",
        },
        { id: generateId(), number: "4.2", text: "On-line (Нац. валюта)" },
        { id: generateId(), number: "4.3", text: "Аванс (Нац. валюта)" },
        {
          id: generateId(),
          number: "4.4",
          text: "Максимал фойда (Ин. валюта)",
        },
        { id: generateId(), number: "4.5", text: "On-line (Ин. валюта)" },
        { id: generateId(), number: "4.6", text: "Аванс (Ин. валюта)" },
        {
          id: generateId(),
          number: "4.7",
          text: "Максимал фойда (Нац. валюта)",
        },
        { id: generateId(), number: "4.8", text: "On-line (Нац. валюта)" },
        { id: generateId(), number: "4.9", text: "Аванс (Нац. валюта)" },
        {
          id: generateId(),
          number: "4.10",
          text: "Максимал фойда (Ин. валюта)",
        },
        { id: generateId(), number: "4.11", text: "On-line (Ин. валюта)" },
        { id: generateId(), number: "4.12", text: "Аванс (Ин. валюта)" },
      ],
    },
  ]);

  //

  const draggedWrapperCard = ref(null);
  const draggedInnerCard = ref(null);
  const startDragInnerArray = ref(null);

  //

  function dragWrapperStart(card) {
    draggedWrapperCard.value = card;
  }

  function dropWrapper(targetCard) {
    if (startDragInnerArray.value) {
      resetDragValues();
      return;
    }

    if (draggedWrapperCard.value !== targetCard) {
      moveCardInArray(cards.value, draggedWrapperCard.value, targetCard);
    }

    resetDragValues();
  }

  //

  function dragInnerStart(row, card) {
    draggedInnerCard.value = row;
    startDragInnerArray.value = card;
  }

  function dropInner(targetCard, card) {
    if (
      !startDragInnerArray.value ||
      !startDragInnerArray.value.data.includes(targetCard)
    ) {
      resetDragValues();
      return;
    }

    if (draggedInnerCard.value !== targetCard) {
      moveCardInArray(card.data, draggedInnerCard.value, targetCard);
    }

    resetDragValues();
  }

  //

  function moveCardInArray(array, draggedCard, targetCard) {
    const draggedIndex = array.indexOf(draggedCard);
    const targetIndex = array.indexOf(targetCard);
    array.splice(draggedIndex, 1);
    array.splice(targetIndex, 0, draggedCard);
  }

  function resetDragValues() {
    draggedWrapperCard.value = null;
    startDragInnerArray.value = null;
  }

  // ~=~=~=~=~=~=~=~=~=~

  function toggleCard(idx) {
    const item = cards.value[idx];
    const localStorage = item.isOpen;

    cards.value.forEach((item) => {
      item.isOpen = false;
    });

    item.isOpen = !localStorage;
  }

  //

  function extractIsOpen(idx) {
    return cards.value[idx].isOpen;
  }

  return {
    cards,

    draggedWrapperCard,
    draggedInnerCard,
    startDragInnerArray,

    dragWrapperStart,
    dropWrapper,

    dragInnerStart,
    dropInner,

    moveCardInArray,
    resetDragValues,

    toggleCard,
    extractIsOpen,
  };
});
