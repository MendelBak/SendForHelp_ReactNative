# React Native application for Send For Help Android application.

navigate inside the `/SendForHelp` directory and open two terminal windows.
`npm install` (for new installations)
`npx react-native start`
`npx react-native run-android`

### Notes on running project:
- Make sure phone is connected and `File Transfer over USB` is enabled.
- If running on emululator and want location to work, need to allow permissions for the app in the emulator App Settings (Allow all the time/Allow only when using app). 

## Coming Features
- Track FirstResponders location and update in real time (watch position). Indicate distance and time to arrival of responder to requester.
- Save favorite locations (Home/Work) with information (door code, floor, special instructions, etc).
- Save emergency contacts and call/email/text if emergency is underway. (How to know this user has emergency?)
- Users within a 20 meter radius have push notification / popup on their (even locked) phone screens, requester scans the code for the victim which alerts his emergency contacts and display allergies and other important information (medical preferences, medical contacts, relevant health issues).
- Auto-engage audio and video recordings from requesters phone, for use by police (potential legal/privacy issues).   
- Responders need to upload certifications and be verified by admins. 
- Three tiers of rescuers? Basic (Non-licensed citizens who have basic First Aid skills). Level 2 Rescuer (EMT, nurses) and Advanced Rescuer (Doctors, Paramedics). - Show level of rescuer responding so that Advanced rescuer will join if only Basic Rescuer were answering. 
- Option for rescuer to indicate that they need more/more advanced rescuers or rescuers with specific equipment to assist.
- Indicate if rescuers have equipment matching the emergency? (TQ or pressure bandage for hemmoraging. Defibrilator for heart attack).
- Easy to follow animations on screen for bystanders for CPR/ bleeding prevention, etc.
- Wider alert range in suburban/rural areas. Smaller range in urban areas. Increase range if no rescuers found.
- The first firstResponder is in charge of the scene. Need to determine who that is (first to accept request or first on scene?). Save that user for legal purposes. (Can just keep PrimaryResponder as first in the array instead of making a special attribute, probably.)
- Level 2 or Advanced rescuers become in charge of emergency if they come to a scene with only a Basic Rescuer. 
- Auto Video and voice capture.
- Override DO NOT DISTURB mode on rescuers phones for emergency alert and on requesters' phone for follow up alerts.

## General TODO
- Need to figure out way to determine if several calls for help in nearby vicinity are the same emergency. Timing + vicinity + prompt the user?
- Handle if users don't turn on GPS during call event.
## Deployment TODO
- Check TODO Tree for comments to self.
- Need to open MongoDB, Google Developers COnsole, Authentication, etc, to all IPs, not just my local IP.
- How to compile TS to JS for server? 
- Set the GOOGLE_APPLICATION_CREDENTIALS environment variable for the backend firebase-admin API key. Don't use the key stored in the codebase. 
- API key for backend requests.
- Deploy backend to AWS EC2 or Kubernetes (need Docker for Kubernetes).
- Add SSL/TLS.
- Make sure that hardcoded IDs are replaced with real user IDs.
- Google Developers Console Credentials page. Need to add authorized origins and redirect URLs from the server (currently only allowing from localhost).
- Currently using the `Nip.io` wildcard DNS server to allow redirects during OAuth authentication. Need to replace that with my actual domain name, when I purchase it via AWS Route 53 and add an A Record.

## Potential Monetization Strategies

- Monthly subscription to use app. Free first month, or reduced for new members/early adopters
- Sell swag.
- Donations.
- Corporate sponsors.
- Admin board for companies / apartment building / office buildings. Manage employees information, health issues, exact location (which floor, access codes), coordination with building security, etc. Company can buy and gift swipes to employees (unlimited emergency swipes) as perks.
- Corporate training sessions on safety (this actually can make a lot of money)
- Subscription for storing extra medical info (allergies, pre-existing medical conditions)
- Crowd funding (everyone in immediate vicinity of emergency prompted to donate small amount).
- Pay for swipe (controversial). Ability to offload your payment to victim by scanning their QR code so that people aren't hesitant to swipe due to being charged.
