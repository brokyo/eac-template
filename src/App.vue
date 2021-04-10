<template>
  <div id="app">
    <div v-if="!started" id="introCard">
      <h1>Everything A Cycle: {{iteration}}</h1>
      <p v-if="subtitle">{{subtitle}}</p>
      <button @click="start">Start</button>
    </div>
    <div v-else id="canvas">

    </div>
    <a href="https://awakening.systems" target="_blank">
      <img id="logo" src="@/assets/icon.png" />
    </a>
  </div>
</template>

<script>
var _ = require('lodash')
import { patch } from '@/audio/synth.js'
import { composition } from '@/audio/composition-config.js'

export default {
  data() {
    return {
      started: false,
      iteration: '01',
      subtitle: 'The Same Recurring Dream'
    }
  },
  methods: {
    async start() {
      this.started = true
      await Tone.start()
      await Tone.Transport.start()
      Tone.Transport.bpm.value = 60
      this.scheduleAudio()
    },
    scheduleAudio() {
      let lastNote = _.last(composition.events);
      let endOfLoop = lastNote.rawTime + lastNote.rawDuration
      let rest = Tone.Time(composition.rest).toSeconds();
      let interval = endOfLoop + rest;

      let part = new Tone.Part((time, event) => {
        patch.synth.triggerAttackRelease(
          event.note,
          event.duration,
          time,
          event.velocity
        );

        Tone.Draw.schedule(() => {

        }, time);

        Tone.Draw.schedule(() => {

        }, time + event.rawDuration);

      }, composition.events);
      part.loopEnd = interval;
      part.loop = true;
      part.start();
    },
    visualStart() {

    }
  }
}
</script>

<style>
@font-face {
  font-family: "BebasNeue";
  src: local("BebasNeue"),
    url(fonts/Bebas_Neue/BebasNeue-Regular.ttf);
}

@font-face {
  font-family: "RobotoSlab";
  src: local("RobotoSlab"),
    url(fonts/Roboto_Slab/static/RobotoSlab-Light.ttf);
}

#logo {
  opacity: 0.5;
  height: 60px;
  width: 60px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

#logo:hover {
  opacity: 1
}

html {
  background: #c0b490;
  color: #1A3644;
}

#introCard {
  text-align: center;
}

h1 {
  margin-top: 40px;;
  font-family: 'BebasNeue', cursive;
  font-size: 44px;
}

p {
  font-family: 'RobotoSlab', serif;
  text-transform: lowercase;
}

button {
  color: #DBDBDB;
  background: #6b2e63;
  border: #6b2e63;
  cursor: pointer;
  margin-top: 80px;
  height: 40px;
  width: 120px;
  text-transform: uppercase;
  font-size: 12px;
  font-family: 'RobotoSlab';
  font-weight: 200;
}

button:hover {
  background: #A14595;
}
</style>
