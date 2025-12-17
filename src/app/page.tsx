import { getDialogues } from '@/app/actions';
import DialogueForm from '@/components/dialogue-form';
import DialogueList from '@/components/dialogue-list';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Plus } from 'lucide-react';

export default async function Home() {
  const dialogues = await getDialogues();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight">OG Dialogues</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <DialogueList dialogues={dialogues} />
      </main>

      <Sheet>
        <SheetTrigger asChild>
            <Button className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg" size="icon">
                <Plus className="h-8 w-8" />
                <span className="sr-only">Add Dialogue</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
            <SheetHeader>
                <SheetTitle>Add a Legendary Dialogue</SheetTitle>
            </SheetHeader>
            <div className="py-4">
                <DialogueForm />
            </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
