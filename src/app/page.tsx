import { getDialogues } from '@/app/actions';
import DialogueForm from '@/components/dialogue-form';
import DialogueList from '@/components/dialogue-list';

export default async function Home() {
  const dialogues = await getDialogues();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <DialogueForm />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <DialogueList dialogues={dialogues} />
      </main>
    </div>
  );
}
