/**
 * --------------------------------------------------------- 
 * MR. DECOY aka the PogBot (version 1.2)
 *
 * Written by Tyler Bifolchi
 * Tenor-Z on Github
 * ---------------------------------------------------------
 * 
 * I wrote this in grade 12, and I decided to go and
 * rewrite it since I lost the original microcontroller and
 * flashed code. It didn't work as expected so here is the
 * fully-functional, revised version of the program, which
 * serves as a fun radio worm that lasts until devices are
 * reflashed
 * ---------------------------------------------------------
 */

// CONFIGURATION & INITIALIZATION
let isInfected = false
const INFECTION_NUMBER = 9 

radio.setTransmitPower(7) // Maximum range

// Set this to true if you want the device with this code to become patient zero
const IS_PATIENT_ZERO = false

if (IS_PATIENT_ZERO) {
    infectThisDevice()
} else {
    basic.showIcon(IconNames.Happy)
}

// The button-triggered easter egg from the original
input.onButtonPressed(Button.A, function () {
    basic.showString("Greetings from Mr. Decoy aka PogBot -- Written by Tyler Bifolchi (TENOR-Z ON GITHUB)")
})

// Here if we received a message from an infected device
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == INFECTION_NUMBER && !isInfected) {
        infectThisDevice()
    }
})

// This is the main infection function
function infectThisDevice() {
    isInfected = true
    music.playMelody("C5 B A G F E D C ", 240)
    
    basic.clearScreen()
    basic.showLeds(`
        . # . # .
        . . . . .
        . . # . .
        . # . # .
        . . # . .
        `)
}

// The background sweep
// Constantly checks channels 0 to 9 and transmits itself to anyone it finds
loops.inBackground(function () {
    while (true) {
        if (!isInfected) {
            // HEALTHY MODE: Scan channels 0 to 9 for the infection ---
            for (let scanChannel = 0; scanChannel <= 9; scanChannel++) {
                // If we get infected mid-loop, stop scanning
                if (isInfected) break; 
                
                radio.setGroup(scanChannel)
                // Pause for 150ms on each channel to listen for incoming packets
                basic.pause(150) 
            }
        } else {
            // INFECTED MODE: Sweep channels 0 to 9 to spread the infection ---
            for (let sendChannel = 0; sendChannel <= 9; sendChannel++) {
                radio.setGroup(sendChannel)
                radio.sendNumber(INFECTION_NUMBER)
                
                // Visual activity flash on the center LED
                led.toggle(2, 2)
                basic.pause(40) 
                led.toggle(2, 2)
            }
            // Wait 2 seconds before executing the next broadcast wave
            // Prevents it from being a flood
            basic.pause(2000)
        }
    }
})
