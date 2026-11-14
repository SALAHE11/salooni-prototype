# Salooni — clickable prototype (v3)

An installable web app for testing Salooni's user stories with barbers. It isn't real software: all data is invented and lives only on the phone you test with. It works offline after the first visit.

- **Languages:** Arabic (default) and French. Tap the `FR` / `ع` button at the top of any screen.
- **Profiles on one phone:** barber (Hamid at Salon Hamid, Al Massira) and three clients. Switch between barber and client under *Mon salon* or *Profil*. Everyone shares the same queue: what the barber does shows up on the client side.
- **Three demo clients:** choose one under *Profil → Client de démo*. Each has his own place and requests. After a reset, Youssef is a starred regular with a reservation (1st in line), Mehdi joined through the app (4th), and Anas isn't in any line.
- **Two working modes for the barber:** *Mon salon → Réglages*. The default is *File d'attente*. *Rendez-vous uniquement* is for shops that work by appointment only. Changing mode reloads an example for that mode.
- **Reset:** *Mon salon → Réinitialiser la démo* brings back the starting state: 5 clients in Hamid's queue, Yassine with 1, Rachid on a break.

## Put it online with GitHub Pages (about 5 minutes)

1. On github.com, create a new repository named `salooni-prototype`. Make it **Public**: free GitHub accounts only get Pages on public repos. It holds only invented data.
2. On the new repository's page, click **uploading an existing file**. Drag in everything from this folder (`index.html`, `manifest.webmanifest`, `sw.js`, `README.md`, and the `fonts` and `icons` folders), then click **Commit changes**.
   - Or from a terminal, inside this folder:
     ```
     git init && git add . && git commit -m "Salooni prototype v1"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/salooni-prototype.git
     git push -u origin main
     ```
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to *Deploy from a branch*, Branch to `main` and folder to `/ (root)`, then click **Save**.
4. After about a minute, the link is `https://YOUR-USERNAME.github.io/salooni-prototype/`.

## Install it on a phone

- **Android (Chrome):** open the link, tap ⋮, then **Add to Home screen** (or **Install app**).
- **iPhone (Safari):** open the link, tap Share, then **Add to Home Screen**.

Open it once with internet. After that it works offline, which helps in shops with weak signal.

## Updating

Edit the files, change `VERSION` in `sw.js` (for example to `salooni-proto-v2`), and push. On the phone, close the app and open it twice to pick up the new version.

## Rules the prototype uses (decide them with pilot barbers)

| Open rule | Default in the prototype |
|---|---|
| Décaler (US-04) | Moves the next client back 1 place; tap again to move him further. Doesn't count as a miss. |
| Attendre (US-04) | The barber sees how long he has waited. The client gets an alert ("Le coiffeur vous attend") and a red banner on *Ma file* until the barber moves on. |
| Passer (US-04) | Removes the client and counts one absence (Statistiques). |
| Alert (US-16) | Fires once, when 2 people are ahead, as an in-app notification. |
| Wait range (US-15) | 15–20 min per person ahead, the person in the chair included. |
| Who can reserve (US-09, US-20) | Only clients the barber starred. |
| Where a reservation goes (US-20) | At the end of the line. Slots start after the current line would be done (20 min per person, at least 45 min from now), so a reservation never passes anyone already waiting. If the line moves faster than that, the barber uses Attendre or Décaler as for any late client. |
| What later clients see (US-19) | Before confirming, the join screen lists the reservations ahead ("Réservation avant vous : 13:00"). They count in the position and the wait. |
| Barber's control of reservations | *File → Réservations aujourd'hui*: an on/off switch, and today's hours as buttons; a tapped hour offers no slots. Nothing is offered after 20:30 (the shop closes at 21:00). Reservations already taken stay. |
| Taken and cancelled slots | A taken time disappears for other regulars. If the barber removes a client, the client sees "Hamid a annulé votre réservation de 13:00" (or "vous a retiré de la file"). |
| Valider chaque demande (Réglages) | Off by default: a regular's reservation enters the line directly. On: it waits as a request until the barber taps Accepter or Refuser. Always on in Rendez-vous mode. |
| Rendez-vous uniquement (Réglages) | No queue to join. Any client, starred or not, can request a free time; the barber accepts or refuses. The barber adds phone or walk-in bookings with *Ajouter* by picking a time. Décaler is hidden. |
| Durée d'un rendez-vous (Réglages) | 30 min, 45 min, 1 h or 1 h 30. Rendez-vous mode only: it sets the spacing of the times offered. It has no effect in File mode. |
| Pause (US-06) | 15 min, 30 min or 1 h. Nobody can join during the break. |
| Close the queue (US-08) | Nobody can join. People already in line stay. |

Every barber action (add, next, décaler, passer, remove) shows a toast with **Annuler**, so random taps during a hand-over can be undone.

## Running a test session (with the audio recording)

**Before:** reset the demo, set it to Arabic, and ask the barber's consent to record. Say the story IDs out loud as you go (for example "US-04"), so you can find them in the recording later.

1. **Queue basics (US-01, 02, 03, 24, 25).** Hand him the phone: "A client just walked in. Add him." Then "someone calls", then "you finished a cut". Count his taps and note where he hesitates.
2. **Late client (US-04).** "Youssef booked but isn't here. What do you do?" Let him pick Attendre, Décaler or Passer. Ask: *How many places should Décaler move him? Should it count against him?*
3. **Regulars (US-09, 20).** Have Anas join the queue, star him on the barber side, then leave the queue as Anas. In client mode show *Réserver une heure*: the hours start after the line. Reserve, then show the barber where Anas landed (last). Ask: *Who in your shop would get a star?*
   - **Walk-in shop:** before handing over the phone, open *Réservations aujourd'hui* and set it to *Fermées*. Run steps 1 and 2 as a pure queue, then show that he could open reservations for a few loyal clients and that they never pass the bench.
   - **Shop that takes bookings:** leave it on *Ouvertes*. Have him block an hour and check that the client no longer sees it. Ask: *Which hours would you block? Lunch, Friday prayer? Should a reservation have to be accepted by you first?*
4. **Pause and closing (US-06, 08).** *Would you use these? When? Before Eid?*
   - **Appointment-only shop:** in *Mon salon → Réglages* choose *Rendez-vous uniquement* and set the length he uses. Show the pending request (Mehdi) with Accepter / Refuser, then switch to client Anas and request a time. Ask: *How long is one booking for you? Would you accept requests from clients you don't know?*
5. **Client side (US-13, 14, 15, 16, 18, 19).** Join Hamid's queue as Anas. Switch back, tap Suivant until the alert shows, then switch to client. Ask: *Is 2 people ahead the right moment? Is the wait range realistic for your shop?*
6. **Statistiques (US-27).** *What would you want to see here at the end of the day?*
7. **Pilot and price (US-26).** *After a free month, if it works, what would it be worth to you each month?*
8. **Close:** *What did we miss? What would stop you from using it on a Saturday?*

The reservation step only works while slots remain, so run it before about 19:00 (earlier if the line is long).

**After:** add the story IDs, timestamps and quotes from the recording to the synthesis sheet's Notes tab.

## One-minute demo (incubator)

Reset the demo first.

1. **Barber:** *Ajouter → Sur place*. A walk-in is in the line in two taps, with no client app needed.
2. **Client** (*Mon salon → Passer en mode client*): the shop page shows each barber's line and a wait range. Join Hamid's queue.
3. **Barber:** star Anas. **Client:** leave the queue, then *Réserver une heure*. The hours start after the line: a regular's booking never passes people who are waiting.
4. **Barber:** *Réservations aujourd'hui*, block an hour. The barber decides when he takes bookings; walk-ins and bookings stay in one line.

## Files

- `index.html`: the whole app (HTML, CSS, JavaScript; no build step).
- `manifest.webmanifest` and `sw.js`: make it installable and offline.
- `fonts/`: Manrope and IBM Plex Sans Arabic (SIL Open Font License, see the license files).
- `icons/`: the Salooni logo.
