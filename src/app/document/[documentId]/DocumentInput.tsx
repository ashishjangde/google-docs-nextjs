import React from 'react'
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs'
import { Id } from '../../../../convex/_generated/dataModel'
import { useStatus } from '@liveblocks/react'
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import useDebounce from '@/hooks/useDebounce';
import { useToast } from '@/hooks/use-toast';
import { LoaderIcon } from 'lucide-react';
interface DocumentInputProps {
  title : string,
  id : Id<"documents">,
}
export default function DocumentInput({title, id}: DocumentInputProps) {
 const status = useStatus();
 const [value , setValue] = React.useState(title);
 const [pending, setPending] = React.useState(false);
 const [isEditing, setIsEditing] = React.useState(false);
 const inputRef = React.useRef<HTMLInputElement>(null);
 const {toast} = useToast();

 const mutate = useMutation(api.document.updateById);

 const debouncedUpdate = useDebounce((newValue: string) => {
  if (newValue === title) return;

  setPending(true);
  mutate({ id, title: newValue })
    .then(() => toast({
      description: "Document updated",
    }))
    .catch(() => toast({
      description: "Failed to update document",
    }))
    .finally(() => setPending(false));
});


const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value;
  setValue(newValue);
  debouncedUpdate(newValue);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setPending(true);
  mutate({ id, title: value })
    .then(() => {
       toast({
      description: "Document updated",
       })
      setIsEditing(false);
    })
    .catch(() => toast({
      description: "Failed to update document",
    }))
    .finally(() => setPending(false));
};


const showLoader = pending || status === "connecting" || status === "reconnecting";
const showError = status === "disconnected";


  return (
    <div className='flex items-center gap-2'>
      {
        isEditing ? (
          <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
        ):(
          <span 
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate">
          {title}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4"  />}
      {!showError && !showLoader && <BsCloudCheck className="size-4 text-green-600" />}
      {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground" />}
    </div>
  )
}
