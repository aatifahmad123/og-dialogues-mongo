import DialogueCard from './dialogue-card';

type Dialogue = {
    _id: string;
    dialogue: string;
    speaker: string;
    deleteToken: string;
    createdAt: string;
};

type DialogueListProps = {
    dialogues: Dialogue[];
};

export default function DialogueList({ dialogues }: DialogueListProps) {
    if (!dialogues || dialogues.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-semibold font-headline">No dialogues yet.</h2>
                <p className="text-muted-foreground mt-2">Be the first one to add a dialogue!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {dialogues.map((dialogue) => (
                <DialogueCard key={dialogue._id} dialogue={dialogue} />
            ))}
        </div>
    );
}
