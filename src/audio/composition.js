var _ = require('lodash')
import { composition } from '@/audio/composition-config.js'

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

export { part }