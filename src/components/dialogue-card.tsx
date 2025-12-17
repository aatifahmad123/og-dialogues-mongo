'use client';

import { useState, useTransition } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { deleteDialogue } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';

type Dialogue = {
    _id: string;
    dialogue: string;
    speaker: string;
    deleteToken: string;
    createdAt: string;
};

export default function DialogueCard({ dialogue }: { dialogue: Dialogue }) {
  const [token, setToken] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteDialogue(dialogue._id, token);
      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        setOpen(false);
        setToken('');
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
    });
  };

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-xl">
          {dialogue.speaker}
        </CardTitle>
        <CardDescription>
          {formatDistanceToNow(new Date(dialogue.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
          "{dialogue.dialogue}"
        </blockquote>
      </CardContent>
      <CardFooter>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto text-muted-foreground hover:text-destructive" aria-label="Delete dialogue">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this masterpiece?</AlertDialogTitle>
              <AlertDialogDescription>
                To delete this dialogue, please enter the 4-digit token you created. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2">
              <Label htmlFor={`delete-token-input-${dialogue._id}`}>Delete Token</Label>
              <Input
                id={`delete-token-input-${dialogue._id}`}
                type="password"
                inputMode="numeric"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="****"
                maxLength={4}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isPending || token.length !== 4}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
