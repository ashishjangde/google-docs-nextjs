"use client";

import { ReactNode,  useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/components/FullScreenLoader";
import { getDocuments, getusers } from "./action";
import { useToast } from "@/hooks/use-toast";
import { Id } from "../../../../convex/_generated/dataModel";

interface user {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();
    const [user , setUser] = useState<user[]>([]);
    const {toast} = useToast();

    const fetchUsers = useMemo( () => async ()=>{
      try {
        
        const user = await getusers();
        setUser(user);
      } catch {
        toast({
          description: "Failed to fetch users",
        })
      }
    },[])

    useEffect(()=>{
      fetchUsers();
    },[fetchUsers])

  return (
    <LiveblocksProvider
    throttle={16}
    authEndpoint={async ()=>{
      const endpoint = "/api/liveblock-auth";
        const room = params.documentId as string;
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return await response.json();
    }}
    resolveUsers={({ userIds }) => {
      return userIds.map(
        (userId) => user.find((user) => user.id === userId) ?? undefined
      )
    }}

    resolveMentionSuggestions={({text})=>{
      let filteredUsers = user;

      if (text) {
        filteredUsers = user.filter((user) => 
          user.name.toLowerCase().includes(text.toLowerCase())
        );
      }

      return filteredUsers.map((user) => user.id);
    }}
    resolveRoomsInfo={async ({roomIds})=>{
      const documents = await getDocuments(roomIds as Id<"documents">[]);
      return documents.map((document) => ({
        id: document.id,
        name: document.name,
      }));
    }}
    >
      <RoomProvider id={params.documentId as string} initialStorage={{leftMargin: 56 , rightMargin: 56}}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Room Loading..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}