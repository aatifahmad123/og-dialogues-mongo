'use client';

import { useState } from 'react';
import { getDialogues } from '@/app/actions';
import DialogueForm from '@/components/dialogue-form';
import DialogueList from '@/components/dialogue-list';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Plus } from 'lucide-react';

type Dialogue = Awaited<ReturnType<typeof getDialogues>>[0];

export default function Home({ dialogues: initialDialogues }: { dialogues: Dialogue[] }) {
  const [open, setOpen] = useState(false);
  const [dialogues, setDialogues] = useState(initialDialogues);

  const handleSuccess = async () => {
    setOpen(false);
    const updatedDialogues = await getDialogues();
    setDialogues(updatedDialogues);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight">OG Dialogues of BTech</h1>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Add Dialogue</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                    <SheetHeader>
                        <SheetTitle>Add a Legendary Dialogue</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                        <DialogueForm onSuccess={handleSuccess} />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <DialogueList dialogues={dialogues} />
      </main>
    </div>
  );
}
