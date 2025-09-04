export type LoungeMessage={id:string;user:string;text:string;createdAt:string};
export async function sendMessage(_u:string,_t:string){return{ok:true}}
export async function fetchMessages():Promise<LoungeMessage[]>{return[]}
