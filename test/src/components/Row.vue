<script setup>
import AppActionMenuBtn from "./AppActionMenuBtn.vue";

import documentIcon from "@/assets/img/documentIcon.svg";

import { useHomeStore } from "@/stores/home.js";

const store = useHomeStore();

const props = defineProps(["row", "card", "idx", "thisLastRow"]);
</script>


<template>
  <div
    draggable="true"
    @dragstart.stop="store.dragInnerStart(row, card)"
    @dragover.prevent
    @drop.stop="store.dropInner(row, card)"
    class="card-row__wrapper"
    :class="{ 'this-last-row': thisLastRow }"
  >
    <div class="card-row__number">
      <div class="card-row__item-title">№</div>
      <div class="card-row__number-value">{{ row.number }}</div>
    </div>
    <div class="card-row__name">
      <div class="card-row__item-title">Название</div>
      <div class="card-row__name-value_container">
        <img :src="documentIcon" alt="" />
        <div class="card-row__name-value">{{ row.text }}</div>
      </div>
    </div>
    <div class="card-row__order">
      <div class="card-row__item-title">Очередность</div>
      <div class="card-row__order-value">{{ idx + 1 }}</div>
    </div>
    <div class="card-row__btn-wrapper">
      <AppActionMenuBtn></AppActionMenuBtn>
    </div>
  </div>
</template>



<style scoped lang='scss'>
.card-row__wrapper {
  display: grid;
  grid-template-columns: 4fr 22.8fr 24fr 15.6fr;

  margin: 0 25px 0 32px;
  padding: 14px 0 16px 0;

  border-bottom: solid 1px #e1e1e1;
}
.this-last-row {
  border-bottom: none;
}
.card-row__number {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
.card-row__item-title {
  color: #949494;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.card-row__number-value {
  color: #212121;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.08px;
}
.card-row__name {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
.card-row__name-value_container {
  display: flex;
  column-gap: 4px;
}
.card-row__name-value {
  color: #212121;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.08px;
}
.card-row__order {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
.card-row__order-value {
  color: #212121;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.08px;
}
.card-row__btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>