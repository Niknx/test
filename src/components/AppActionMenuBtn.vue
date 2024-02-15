<script setup>
import trashIcon from "@/assets/img/trashIcon.svg";
import penIcon from "@/assets/img/penIcon.svg";
import { ref, onMounted, onBeforeUnmount } from "vue";

const toggleDropDown = ref(false);
const dropDown = ref(null);

function dropDownToggle() {
  toggleDropDown.value = !toggleDropDown.value;
}
function dropDownClose(event) {
  if (!dropDown.value.contains(event.target)) {
    toggleDropDown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", dropDownClose);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", dropDownClose);
});
</script>


<template>
  <div
    ref="dropDown"
    class="action-btn__wrapper"
    :class="{ 'action-btn__wrapper-active': toggleDropDown }"
  >
    <div class="action-btn__container" @click="dropDownToggle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10Z"
        />
      </svg>
    </div>
    <Transition>
      <div v-show="toggleDropDown" class="action-btn__dd-container">
        <div class="action-btn__dd-row">
          <img :src="penIcon" alt="" />Редактировать
        </div>

        <div class="action-btn__dd-row">
          <img :src="trashIcon" alt="" />Удалить
        </div>
      </div>
    </Transition>
  </div>
</template>


<style lang='scss' scoped>
.action-btn__wrapper {
  position: relative;
}
.action-btn__container {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;

  border-radius: 12px;
  border: solid 1px #397af5;

  cursor: pointer;

  svg {
    path {
      fill: #397af5;
      transition: all 0.2s ease-in-out 0s;
    }
  }
}

.action-btn__dd-container {
  position: absolute;
  top: 115%;
  right: 0;

  display: flex;
  flex-direction: column;

  padding: 4px;

  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 1.162px 2.214px 0px rgba(0, 0, 0, 0.07),
    0px 2.793px 5.32px 0px rgba(0, 0, 0, 0.05),
    0px 4px 4px 0px rgba(0, 0, 0, 0.06);

  transition: all 0.2s ease-in-out 0s;

  z-index: 2;
}
.action-btn__dd-row {
  display: flex;
  column-gap: 10px;

  padding: 10px 24px 10px 10px;

  color: #212121;
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 133.333% */
  letter-spacing: 0.075px;

  border-radius: 8px;

  transition: all 0.2s ease-in-out 0s;
  cursor: pointer;

  &:hover {
    background-color: #edf2ff;
  }
}

.action-btn__wrapper-active {
  .action-btn__container {
    background-color: #397af5;
  }
  svg {
    path {
      fill: #fff;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>