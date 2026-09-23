import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

const schema=z.object({fileName:z.string().min(1).max(180),contentType:z.enum(['image/jpeg','image/png','image/webp']),guestName:z.string().trim().min(2).max(100)});
const safeName=(s:string)=>s.toLowerCase().replace(/[^a-z0-9._-]/g,'-').slice(-100);
export async function POST(request:Request){try{const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:'Invalid upload details.'},{status:400});const env=['S3_REGION','S3_BUCKET','S3_ACCESS_KEY_ID','S3_SECRET_ACCESS_KEY'];if(env.some(k=>!process.env[k]))return NextResponse.json({error:'Photo upload storage is not configured yet. Add the S3 variables from .env.example.'},{status:503});const s3=new S3Client({region:process.env.S3_REGION!,credentials:{accessKeyId:process.env.S3_ACCESS_KEY_ID!,secretAccessKey:process.env.S3_SECRET_ACCESS_KEY!}});const key=`wedding-uploads/${Date.now()}-${safeName(parsed.data.guestName)}-${safeName(parsed.data.fileName)}`;const command=new PutObjectCommand({Bucket:process.env.S3_BUCKET!,Key:key,ContentType:parsed.data.contentType,Metadata:{guest:parsed.data.guestName}});const uploadUrl=await getSignedUrl(s3,command,{expiresIn:300});return NextResponse.json({uploadUrl,key});}catch{return NextResponse.json({error:'Unable to create a secure upload URL.'},{status:500})}}
