import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "未检测到文件" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    
    await fs.writeFile(filePath, Buffer.from(buffer));
    
    return NextResponse.json({ 
      filePath: `/uploads/${fileName}` 
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ 
      error: "文件上传失败",
      details: error.message 
    }, { status: 500 });
  }
}