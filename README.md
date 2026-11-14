# Salooni — clickable prototype (v1)

An installable web app for testing Salooni's user stories with barbers. It isn't real software: all data is invented and lives only on the phone you test with. It works offline after the first visit.

- **Languages:** Arabic (default) and French. Tap the `FR` / `ع` button at the top of any screen.
- **Two profiles on one phone:** barber (Hamid at Salon Hamid, Al Massira) and client (Anas). Switch under *Mon salon* or *Profil*. Both profiles share the same queue: what the barber does shows up on the client side.
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
| Décaler (US-04) | Moves the next client back 2 places. Doesn't count as a miss. |
| Passer (US-04) | Removes the client and counts one absence (Statistiques). |
| Alert (US-16) | Fires once, when 2 people are ahead, as an in-app notification. |
| Wait range (US-15) | 15–20 min per person ahead, the person in the chair included. |
| Who can reserve (US-09, US-20) | Only clients the barber starred. Slots every 30 min, starting about 45 min from now. |
| Pause (US-06) | 15 min, 30 min or 1 h. Nobody can join during the break. |
| Close the queue (US-08) | Nobody can join. People already in line stay. |

Every barber action (add, next, décaler, passer, remove) shows a toast with **Annuler**, so random taps during a hand-over can be undone.

## Running a test session (with the audio recording)

**Before:** reset the demo, set it to Arabic, and ask the barber's consent to record. Say the story IDs out loud as you go (for example "US-04"), so you can find them in the recording later.

1. **Queue basics (US-01, 02, 03, 24, 25).** Hand him the phone: "A client just walked in. Add him." Then "someone calls", then "you finished a cut". Count his taps and note where he hesitates.
2. **Late client (US-04).** "Youssef booked but isn't here. What do you do?" Let him pick Attendre, Décaler or Passer. Ask: *How many places should Décaler move him? Should it count against him?*
3. **Regulars (US-09, 20).** Have him star Anas. Switch to client mode and show *Réserver une heure*. Ask: *Who in your shop would get a star?*
4. **Pause and closing (US-06, 08).** *Would you use these? When? Before Eid?*
5. **Client side (US-13, 14, 15, 16, 18, 19).** Join Hamid's queue as Anas. Switch back, tap Suivant until the alert shows, then switch to client. Ask: *Is 2 people ahead the right moment? Is the wait range realistic for your shop?*
6. **Statistiques (US-27).** *What would you want to see here at the end of the day?*
7. **Pilot and price (US-26).** *After a free month, if it works, what would it be worth to you each month?*
8. **Close:** *What did we miss? What would stop you from using it on a Saturday?*

**After:** add the story IDs, timestamps and quotes from the recording to the synthesis sheet's Notes tab.

## Files

- `index.html`: the whole app (HTML, CSS, JavaScript; no build step).
- `manifest.webmanifest` and `sw.js`: make it installable and offline.
- `fonts/`: Manrope and IBM Plex Sans Arabic (SIL Open Font License, see the license files).
- `icons/`: the Salooni logo.
