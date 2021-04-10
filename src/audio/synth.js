import { config } from './synth-config.js'

var patch = {
    synth: new Tone.PolySynth(),
    tremolo: new Tone.Tremolo(config.tremoloConfig).start(),
    vibrato: new Tone.Vibrato(config.vibratoConfig),
    chorus: new Tone.Chorus(config.chorusConfig).start(),
    eq3: new Tone.EQ3(config.eq3Config),
    pingPongDelay: new Tone.PingPongDelay(config.pingPongDelayConfig),
    feedbackDelay: new Tone.FeedbackDelay(config.feedbackDelayConfig),
    reverb: new Tone.Reverb(config.reverbConfig),
    out: new Tone.Gain()
};

patch.synth.set({
    oscillator: {
      type: "custom",
      partials: config.partialsConfig
    },
    envelope: config.envelopeConfig
});

patch.synth.chain(
    patch.eq3,
    patch.tremolo,
    patch.vibrato,
    patch.chorus,
    patch.pingPongDelay,
    patch.feedbackDelay,
    patch.reverb,
    patch.out,
    Tone.Destination
);

export { patch }