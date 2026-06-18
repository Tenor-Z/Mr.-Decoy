# Mr.-Decoy
A lightweight, self-replicating "radio worm" built for BBC Micro:bit devices using TypeScript/MakeCode. 

This project is meant to demonstrate decentralized ad-hoc networking, parallel processing using background execution threads, and multi-channel sweeping protocols.
Although I originally conceived this in high school, the project has been refactored to replace unstable mechanisms with a robust, event-driven dual-sweep architecture.

## System Architecture

Mr. Decoy operates as a decentralized radio mesh program built on the BBC Micro:bit radio subsystem.

Because a Micro:bit can only listen on a single radio group at any given moment, the project implements a synchronized dual-sweep strategy to maximize network coverage and message propagation.

### Healthy State

Devices begin in a passive listening state.

- Displays a happy face icon
- Sweeps radio groups 0–9
- Dwells on each channel for approximately 150ms
- Waits for a valid propagation packet

```text
Group 0 → Group 1 → Group 2 → ... → Group 9
```

A background execution loop performs channel sweeping continuously while the main thread remains available for radio events.

### Propagation State

When a device receives the designated propagation packet, an asynchronous radio event is triggered.

The node then:

- Switches to propagation mode
- Displays the Pog face matrix
- Plays an audio notification
- Terminates passive scanning
- Begins active transmission

Every 2 seconds the device sweeps channels 0–9 and rebroadcasts the propagation packet.

```text
Patient Zero
      │
      ▼
Scanning Node
      │
      ▼
State Transition
      │
      ▼
New Broadcasting Node
```

As additional nodes transition, the network expands organically without requiring any central coordinator.

### Event-Driven Design

The current architecture uses:

- Radio event handlers
- Background execution threads
- State-based behavior switching
- Multi-channel sweep scheduling

This replaced earlier polling-heavy implementations that proved unreliable during large-scale testing.

---

## Deployment

### Target Nodes

Configure:

```typescript
const IS_PATIENT_ZERO = false;
```

Flash this build to all nodes intended to begin in the listening state.

Upon startup, these devices will display a happy face and begin channel sweeping.

### Patient Zero

Configure:

```typescript
const IS_PATIENT_ZERO = true;
```

Flash this build to a single Micro:bit.

Upon startup, the device immediately enters propagation mode and begins broadcasting across all radio groups.

---

## What This Project Demonstrates

- Ad-hoc networking
- Distributed communication systems
- Radio packet propagation
- Event-driven embedded programming
- Background task execution
- Multi-channel communication strategies
- Network growth without centralized infrastructure
