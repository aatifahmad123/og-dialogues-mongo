'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/dbConnect';
import Dialogue, { IDialogue } from '@/lib/models/dialogue';

const dialogueSchema = z.object({
  dialogue: z.string().min(1, 'Dialogue cannot be empty.').max(500, 'Dialogue is too long.'),
  speaker: z.string().min(1, 'Speaker cannot be empty.').max(100, 'Speaker name is too long.'),
  deleteToken: z.string().regex(/^\d{4}$/, 'Token must be exactly 4 digits.'),
});

export async function addDialogue(prevState: any, formData: FormData) {
  try {
    const validatedFields = dialogueSchema.safeParse({
      dialogue: formData.get('dialogue'),
      speaker: formData.get('speaker'),
      deleteToken: formData.get('deleteToken'),
    });

    if (!validatedFields.success) {
      return {
        message: 'Invalid form data. Please check your inputs.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    await dbConnect();
    await Dialogue.create(validatedFields.data);
    
    revalidatePath('/');
    return { message: 'Dialogue added successfully!', errors: {} };
  } catch (e) {
    console.error(e);
    return { message: 'Database error: Failed to add dialogue.', errors: {} };
  }
}

export async function deleteDialogue(id: string, token: string) {
  if (!token || !/^\d{4}$/.test(token)) {
    return { success: false, message: 'Invalid token format. Must be 4 digits.' };
  }

  try {
    await dbConnect();
    const dialogue = await Dialogue.findById(id);

    if (!dialogue) {
      return { success: false, message: 'Dialogue not found.' };
    }

    if (dialogue.deleteToken !== token) {
      return { success: false, message: 'Incorrect delete token.' };
    }

    await Dialogue.findByIdAndDelete(id);

    revalidatePath('/');
    return { success: true, message: 'Dialogue deleted successfully.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Database error: An error occurred during deletion.' };
  }
}

export async function getDialogues() {
    await dbConnect();
    const dialogues = await Dialogue.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(dialogues)) as (Omit<IDialogue, 'createdAt' | '_id'> & { _id: string, createdAt: string })[];
}
