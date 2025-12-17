# **App Name**: OG Dialogues

## Core Features:

- Dialogue Submission: Allow users to submit dialogues with the name of the speaker.
- Dialogue Display: Display all submitted dialogues as cards, sorted by submission date (newest first).
- Delete Token Creation: Allow users to set a 4-digit token when submitting a dialogue for deletion purposes.
- Dialogue Saving: Save dialogue data (dialogue, speaker, delete token) in MongoDB.
- Dialogue Deletion: Allow users to delete a dialogue by entering the correct 4-digit token associated with it. Reject deletion if the token is incorrect.

## Style Guidelines:

- Primary color: Slate Blue (#717ECE) for a calming and reliable feel.
- Background color: Very light grayish-blue (#E8EBF7) to complement the primary.
- Accent color: Soft Violet (#A585C2) to give actions a subtle punch.
- Body and headline font: 'Inter', a sans-serif font, providing a modern and neutral aesthetic for both headings and body text.
- Single-page layout with a mobile-first, responsive design. The dialogues display in cards. A submission form stays fixed at the top.
- Use subtle animations for actions such as submitting or deleting a dialogue. For example, show a brief loading animation after submit or a fade out when deleting an entry.