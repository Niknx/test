<script setup>
import Row from "./Row.vue";
import AppActionMenuBtn from "./AppActionMenuBtn.vue";

import { computed, ref, onMounted, watch } from "vue";
import { useHomeStore } from "@/stores/home.js";

import folderIcon from "@/assets/img/folderIcon.svg";

const store = useHomeStore();

const props = defineProps(["card", "idx"]);

const subcategories = computed(() => {
  if (props.card.data.length) {
    return props.card.data.map((item) => item.text).join(" / ");
  } else {
    return "—";
  }
});

//

const isOpen = computed(() => {
  return store.extractIsOpen(props.idx);
});

let rows;
onMounted(() => {
  rows = document.querySelector(`#rows-${props.idx}`);
});

watch(isOpen, () => {
  if (isOpen.value) {
    rows.style.height = rows.scrollHeight + "px";
  } else {
    rows.style.height = 0;
  }
});
</script>

<template>
  <div
    draggable="true"
    @dragstart.stop="store.dragWrapperStart(card)"
    @dragover.prevent
    @drop.stop="store.dropWrapper(card)"
    class="card"
  >
    <div class="card__header">
      <div class="card__number">
        <div class="card__item-title">№</div>
        <div class="card__number-value">{{ card.number }}</div>
      </div>
      <div class="card__name">
        <div class="card__item-title">Название</div>
        <div class="card__name-value_container">
          <img :src="folderIcon" alt="" />
          <div class="card__name-value">
            {{ card.content }}
          </div>
        </div>
      </div>
      <div class="card__order">
        <div class="card__item-title">Очередность</div>
        <div class="card__order-value">{{ idx + 1 }}</div>
      </div>
      <div class="card__subcategories">
        <div class="card__item-title">Подкатегории</div>
        <div class="card__subcategories-value">{{ subcategories }}</div>
      </div>
      <div class="card__btn-container">
        <div class="card__row-counter">{{ card.data.length }}</div>
        <div class="card__btn-container">
          <div
            class="card__btn-toggle-row"
            @click="store.toggleCard(idx)"
            :class="{ 'card__btn-toggle-row_active': card.isOpen }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <AppActionMenuBtn></AppActionMenuBtn>
        </div>
      </div>
    </div>
    <TransitionGroup
      class="card__rows-container"
      :id="`rows-${idx}`"
      :class="{ 'card__rows-container-active': isOpen }"
      name="list"
      tag="div"
    >
      <Row
        v-for="(row, idx) of card.data"
        :key="row.id"
        :row="row"
        :card="card"
        :idx="idx"
        :thisLastRow="idx + 1 == card.data.length"
      ></Row>
    </TransitionGroup>
  </div>
</template>



<style scoped lang='scss'>
.card {
  display: flex;
  flex-direction: column;

  border-radius: 12px;
  background: #fff;
}
.card__header {
  display: grid;
  grid-template-columns: 4fr 12fr 10.8fr 28.8fr 10.4fr;

  padding: 18px 25px 18px 32px;

  border-bottom: solid 1px #e1e1e1;
}
.card__number {
  display: flex;
  flex-direction: column;
  row-gap: 9px;
}
.card__item-title {
  color: #949494;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.card__number-value {
  color: #212121;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.08px;
}
.card__name {
  display: flex;
  flex-direction: column;
  row-gap: 9px;
}
.card__name-value_container {
  display: flex;
  align-items: center;
  column-gap: 6px;
}
.card__name-value {
  color: #212121;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
  letter-spacing: 0.08px;
  text-transform: uppercase;
}
.card__order {
  display: flex;
  flex-direction: column;
  row-gap: 9px;
}
.card__order-value {
  color: #212121;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.08px;
}
.card__subcategories {
  display: flex;
  flex-direction: column;
  row-gap: 9px;

  overflow: hidden;
}
.card__subcategories-value {
  overflow: hidden;
  color: #212121;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.08px;
}

.card__btn-container {
  justify-self: end;

  display: flex;
  align-items: center;
  column-gap: 24px;
}
.card__row-counter {
  padding: 3px 10px;

  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  background-color: #2553c646;
  border-radius: 30px;
}
.card__btn-toggle-row {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;

  border-radius: 12px;
  border: 1px solid #397af5;
  background: #397af5;

  cursor: pointer;
  transition: all 0.2s ease-in-out 0s;

  svg {
    transition: all 0.2s ease-in-out 0s;
    path {
      stroke: #fff;
    }
  }
}

.card__btn-toggle-row_active {
  background: #edf2ff;

  svg {
    transform: rotate(-180deg);
    path {
      stroke: #397af5;
    }
  }
}

.card__rows-container {
  height: 0;

  opacity: 0;
  overflow: hidden;

  transition: all 0.2s linear 0s;
}

.card__rows-container-active {
  opacity: 1;
  overflow: visible;
}

.list-move {
  transition: all 0.2s ease 0s;
}
</style>