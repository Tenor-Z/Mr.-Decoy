// If the A button is pressed, display the greetings string
input.onButtonPressed(Button.A, function () {
    basic.showString("Greetings from Mr. Decoy aka PogBot -- Written by Tyler Bifolchi (TENOR-Z ON GITHUB)")
})
// Discover clients and their infection status and populate a list of discovered client IDs and their virus status
// It only runs when a radio signal from another micro:bit is recieved
radio.onReceivedValue(function (name, value) {
    if (name == "discover") {
        // If the packet was recieved on the -1 (0) pin (if not already infected)
        if (virus_clients.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber)) == -1) {
            // Forward it
            virus_clients.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
            infection_status.push(value)
        } else {
            // If it is already infected, add it to the list to prevent reinfection (it would eventually be reflashed after a number of infections)
            infection_status[virus_clients.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber))] = value
        }
    }
})
/**
 * ---------------------------------------------------------
 * 
 * MR. DECOY aka the PogBot
 * 
 * Written by Tyler Bifolchi
 * 
 * Tenor-Z on Github
 * 
 * ---------------------------------------------------------
 * 
 * I wrote this shit in grade 12, and I decided to go and
 * 
 * rewrite it since I lost the original microcontroller and
 * 
 * flashed code.
 * 
 * ---------------------------------------------------------
 * 
 * It's hip to fuck bees
 */
/**
 * List that checks whether a micro:bit was recently infected
 */


let infection_status: number[] = []
let virus_clients: number[] = []
// List of infected clients (this goes unused)
// The initial thing that shows we are connected

basic.showIcon(IconNames.Happy)
music.playMelody("D F A - B D A G ", 120)

// Infect on the set group 12
radio.setGroup(12)
virus_clients = []
infection_status = []

// Send itself to a random micro:bit
radio.sendValue("infect", virus_clients[randint(0, virus_clients.length - 1)])

// basic.showArrow(ArrowNames.North)
// Give it time to start on the other side
basic.pause(500)
// This goes unused
let ranonce = 1
// And show the pog face afterwards
basic.clearScreen()
basic.showLeds(`
    . # . # .
    . . . . .
    . . # . .
    . # . # .
    . . # . .
    `)
