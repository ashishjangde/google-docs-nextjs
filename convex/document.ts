import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

import { mutation, query } from "./_generated/server";

export const getByIds = query({
    args: {ids: v.array(v.id("documents"))},
    handler : async (ctx ,{ids}) => {
        const documents = []
        for(const id of ids){
            const document = await ctx.db.get(id);
            if(document){
                documents.push({id: document._id , name : document.title})
            }else{
                documents.push({id, name:"[Removed]"})
            }
        }

        return documents;
    }
})


export const create = mutation({
    args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
    handler: async (ctx, args) => {
      const user = await ctx.auth.getUserIdentity();
  
      if (!user) {
        throw new ConvexError("Unathorized");
      }
  
      const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;
  
      return await ctx.db.insert("documents", {
        title: args.title ?? "Untitled coument",
        ownerId: user.subject,
        organizationId,
        initialContent: args.initialContent,
      });
    },
  });

  export const get = query({
    args: {paginationOpts : paginationOptsValidator , search: v.optional(v.string())},
    handler: async(ctx , {paginationOpts , search}) =>{
        const user = ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("Unauthorized")
        }
        const organizationId = await (user.then((user)=>  user?.organization_id ?? undefined  as undefined | string))
        if(search && organizationId){
          return await ctx.db
          .query("documents")
          .withSearchIndex("search_title", (q)=>
            q.search("title", search).eq("organizationId", organizationId as string)
          )
          .paginate(paginationOpts)
        }
        if(search){
          return await ctx.db
          .query("documents")
          .withSearchIndex("search_title", (q)=>
            q.search("title", search).eq("ownerId", user.then( (user) =>  user?.subject) as unknown as string)
          ).paginate(paginationOpts)
        }

        if (organizationId) {
          return await ctx.db
            .query("documents")
            .withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId as string))
            .order("desc")
            .paginate(paginationOpts);
        }

        return await ctx.db
        .query("documents")
        .withIndex("by_owner_id", (q) => q.eq("ownerId", user.then( (user) =>  user?.subject) as unknown as string))
        .order("desc")
        .paginate(paginationOpts);
    },
  })