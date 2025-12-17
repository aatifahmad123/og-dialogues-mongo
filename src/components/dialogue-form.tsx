'use client';

import { useActionState, useFormStatus } from 'react-dom';
import { addDialogue } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useActionState as useReactActionState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit Dialogue
    </Button>
  );
}

export default function DialogueForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useReactActionState(addDialogue, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message?.includes('success')) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl tracking-tight">OG Dialogues</CardTitle>
        <CardDescription>Submit a legendary dialogue from your B.Tech days.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dialogue">Dialogue</Label>
            <Textarea id="dialogue" name="dialogue" placeholder='"To infinity, and beyond!"' required />
            {state.errors?.dialogue && <p className="text-sm font-medium text-destructive">{state.errors.dialogue[0]}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="speaker">Said by</Label>
              <Input id="speaker" name="speaker" placeholder="Buzz Lightyear" required />
              {state.errors?.speaker && <p className="text-sm font-medium text-destructive">{state.errors.speaker[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="deleteToken">4-Digit Delete Token</Label>
              <Input id="deleteToken" name="deleteToken" type="password" inputMode="numeric" placeholder="e.g., 1234" required pattern="\\d{4}" maxLength={4} />
              {state.errors?.deleteToken && <p className="text-sm font-medium text-destructive">{state.errors.deleteToken[0]}</p>}
            </div>
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
