<script setup>
import { computed, ref } from "vue";
import { useHomeStore } from "@/stores/home.js";

import Card from "@/components/Card.vue";

const store = useHomeStore();

const cards = computed(() => {
  return store.cards;
});
</script>

<template>
  <div class="wrapper">
    <div class="table__container">
      <div class="table__title-container">
        <div class="table__title-text">Список тем обращения и продуктов</div>
        <div class="table__title-card">Найдено: {{ cards.length }}</div>
      </div>
      <TransitionGroup class="card__container" name="list" tag="div">
        <Card
          v-for="(card, idx) in cards"
          :key="card.id"
          :card="card"
          :idx="idx"
        ></Card>
      </TransitionGroup>
    </div>
  </div>
</template>



<style scoped lang='scss'>
.wrapper {
  width: 100%;
}

.table__container {
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  max-width: 1650px;

  margin: 170px auto 170px auto;
}
.table__title-container {
  display: flex;
  align-items: center;
  column-gap: 14px;
}
.table__title-text {
  color: #000;
  font-family: "Montserrat", sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.table__title-card {
  padding: 4px 10px;

  color: #397af5;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.06px;

  border-radius: 14px;
  background: #fff;
}

.card__container {
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  max-width: 1650px;

  margin: 0 auto;
}

.list-move {
  transition: all 0.2s ease 0s;
}

@media (max-width: 1690px) {
  .table__container {
    padding: 0 20px;
  }
}
</style>