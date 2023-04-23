<template>
  <div class="flex items-center justify-center h-screen" :class="show ? 'app' : ''">
    <div class="flex items-center justify-center px-96 py-96">
      <div class="inline-flex flex-col space-y-6 items-center justify-end pl-1.5 pr-0.5">
        <transition name="nickname-fade">
          <div class="inline-flex items-center justify-center w-full" v-if="show">
            <div class="text-5xl font-extrabold text-center text-white">
              {{ eventData.nickname }}
            </div>
          </div>
        </transition>
        <transition name="widget-fade">
          <div class="inline-flex space-x-2 items-start justify-end w-5/6 h-16" v-if="show">
            <div class="flex space-x-6 items-center justify-end w-72 pt-1">
              <component style="width: 56px" :is="levels[eventData.lvl]" />
              <p class="w-52 h-full text-7xl font-extrabold text-center text-white current-elo">
                <vue3-autocounter ref="counter" :startAmount="
                  eventData.result === 'win'
                    ? eventData.elo.current - Number(eventData.elo.diff)
                    : eventData.elo.current + Number(eventData.elo.diff)
                " :endAmount="eventData.elo.current" :duration="2" :autoinit="false" />
              </p>
            </div>
            <div class="w-16 h-5">
              <p class="flex-1 h-full text-2xl font-bold"
                :class="eventData.result === 'win' ? 'text-green-500' : 'text-red-500'">
                {{ eventData.result === 'win' ? '+' : '-' }}{{ eventData.elo.diff }}
              </p>
            </div>
          </div>
        </transition>
        <transition name="stats-fade">
          <div class="inline-flex space-x-3.5 items-center justify-end" v-if="showStats">
            <div class="inline-flex flex-col space-y-2 items-start justify-start px-2">
              <div class="inline-flex items-center justify-end w-full h-1/2">
                <div class="flex items-center justify-center h-full p-1.5">
                  <crosshair-icon class="text-white" />
                </div>
                <p class="w-10 h-full text-2xl font-extrabold text-center text-white uppercase">
                  {{ eventData.stats.kills }}
                </p>
              </div>
              <p class="w-full h-6 text-2xl font-bold text-center text-gray-50 uppercase stats-title">Kills</p>
            </div>
            <div class="inline-flex flex-col space-y-2 items-start justify-start px-2">
              <div class="inline-flex items-center justify-end w-full h-1/2">
                <div class="flex items-center justify-center h-full p-1.5">
                  <sad-smile-icon class="text-white" />
                </div>
                <p class="w-10 h-full text-2xl font-extrabold text-center text-white uppercase">
                  {{ eventData.stats.deaths }}
                </p>
              </div>
              <p class="w-full h-6 text-2xl font-bold text-center text-gray-50 uppercase stats-title">Death</p>
            </div>
            <div class="inline-flex flex-col space-y-2 items-start justify-start px-2">
              <div class="inline-flex items-center justify-end w-full h-1/2">
                <div class="flex items-center justify-center h-full p-1.5">
                  <star-icon class="text-white" />
                </div>
                <p class="w-10 h-full text-2xl font-extrabold text-center text-white uppercase">
                  {{ eventData.stats.mvp }}
                </p>
              </div>
              <p class="w-full h-6 text-2xl font-bold text-center text-gray-50 uppercase stats-title">MVP</p>
            </div>
            <div class="inline-flex flex-col space-y-2 items-start justify-start px-2">
              <div class="inline-flex items-center justify-end w-full h-1/2">
                <div class="flex items-center justify-center h-full p-1.5">
                  <chart-icon class="text-white" />
                </div>
                <p class="w-10 h-full text-2xl font-extrabold text-center text-white uppercase">
                  <!-- kd -->
                  {{ (eventData.stats.kills / eventData.stats.deaths).toFixed(2) }}
                </p>
              </div>
              <p class="w-full h-6 text-2xl font-bold text-center text-gray-50 uppercase stats-title">K/D</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Level1 from './assets/levels/faceit1.svg?component';
import Level2 from './assets/levels/faceit2.svg?component';
import Level3 from './assets/levels/faceit3.svg?component';
import Level4 from './assets/levels/faceit4.svg?component';
import Level5 from './assets/levels/faceit5.svg?component';
import Level6 from './assets/levels/faceit6.svg?component';
import Level7 from './assets/levels/faceit7.svg?component';
import Level8 from './assets/levels/faceit8.svg?component';
import Level9 from './assets/levels/faceit9.svg?component';
import Level10 from './assets/levels/faceit10.svg?component';
import ChartIcon from './assets/icons/chart.svg?component';
import CrosshairIcon from './assets/icons/crosshair.svg?component';
import SadSmileIcon from './assets/icons/sad_smile.svg?component';
import StarIcon from './assets/icons/star.svg?component';

const show = ref(false);
const showStats = ref(false);
const sse = new EventSource(window.location.origin + '/api/events');

const levels = {
  '1': Level1,
  '2': Level2,
  '3': Level3,
  '4': Level4,
  '5': Level5,
  '6': Level6,
  '7': Level7,
  '8': Level8,
  '9': Level9,
  '10': Level10,
};

const eventData = reactive({
  nickname: '',
  lvl: 10,
  result: '',
  elo: {
    diff: '',
    current: 0,
  },
  stats: {
    kills: 0,
    assists: 0,
    deaths: 0,
    mvp: 0,
  },
});

const counter = ref(null);

sse.onmessage = (event) => {
  const data = JSON.parse(event.data);
  eventData.nickname = data.nickname;
  eventData.lvl = data.lvl;
  eventData.elo.diff = data.elo.diff;
  eventData.elo.current = data.elo.current;
  eventData.result = data.result;
  eventData.stats = data.stats;

  show.value = true;
  showStats.value = true;

  setTimeout(() => {
    counter.value.start();
  }, 2500);

  setTimeout(() => {
    showStats.value = false;
    show.value = false;
  }, 10000);
};
</script>

<style>
.app {
  transition: background-color 0.6s ease 0s;
  background: rgba(0, 0, 0, 0.90);
}

.widget {
  height: 500px;
  background-color: red;
  color: white;
}

.widget-fade {
  transition-duration: 1.5s;
}

.widget-fade-enter-active {
  animation: backInDown;
  animation-duration: 2s;
}

.widget-fade-leave-active {
  animation: backOutDown;
  animation-duration: 2s;
}

.stats-fade-enter-active {
  animation: backInUp;
  animation-duration: 4s;
}

.stats-fade-leave-active {
  animation: zoomOut;
  animation-duration: 1.5s;
}

.nickname-fade-enter-active {
  animation: backInDown;
  animation-duration: 4s;
}

.nickname-fade-leave-active {
  animation: zoomOut;
  animation-duration: 1.5s;
}

.current-elo {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-style: normal;
  line-height: initial;
  font-size: 72px;
}

.eloDiff {
  font-size: 50px;
}

.stats-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-style: normal;
  line-height: initial;
}

.stats {
  font-size: 40px;
  color: #bdc3c7;
}

.stats div {
  color: white;
  font-weight: 100;
}

.stats div div {
  color: #bdc3c7;
  text-transform: uppercase;
}
</style>
