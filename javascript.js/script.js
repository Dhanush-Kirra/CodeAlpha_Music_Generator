const notes = [
    "C4","D4","E4","F4","G4","A4","B4",
    "C5","D5","E5","F5","G5","A5","B5"
];

const output = document.getElementById("output");

let generatedMelody = [];
let currentPart = null;

document.getElementById("generateBtn").addEventListener("click", () => {

    generatedMelody = [];

    for(let i=0;i<16;i++){

        const randomNote =
        notes[Math.floor(Math.random()*notes.length)];

        generatedMelody.push(randomNote);
    }

    output.textContent =
    generatedMelody.join("  •  ");
});

document.getElementById("playBtn").addEventListener("click", async () => {

    if(generatedMelody.length === 0){
        alert("Generate a melody first!");
        return;
    }

    await Tone.start();

    Tone.Transport.stop();
    Tone.Transport.cancel();

    const synth = new Tone.PolySynth().toDestination();

    currentPart = new Tone.Sequence(
        (time,note)=>{
            synth.triggerAttackRelease(
                note,
                "8n",
                time
            );
        },
        generatedMelody,
        "4n"
    );

    currentPart.start(0);

    Tone.Transport.start();
});

document.getElementById("stopBtn").addEventListener("click", () => {

    Tone.Transport.stop();

    if(currentPart){
        currentPart.dispose();
        currentPart = null;
    }
});