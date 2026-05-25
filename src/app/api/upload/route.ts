import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const chatId = formData.get('chatId') as string;

    if (!file || !chatId) {
      return NextResponse.json({ error: 'Arquivo ou chatId ausentes.' }, { status: 400 });
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    
    // Caminho no Firebase Storage
    const fileRef = ref(storage, `chats/${chatId}/${Date.now()}_${file.name}`);
    
    // Upload do buffer
    await uploadBytes(fileRef, buffer, {
      contentType: file.type
    });
    
    const url = await getDownloadURL(fileRef);
    
    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    console.error('Erro no upload do servidor:', error);
    return NextResponse.json({ error: 'Erro no upload', message: error.message }, { status: 500 });
  }
}
