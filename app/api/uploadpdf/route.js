import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

// 验证PDF文件
function validatePDFFile(file) {
  // 检查文件大小 (10MB限制)
  if (file.size > 10 * 1024 * 1024) {
    return "文件大小超过10MB限制";
  }
  
  // 检查文件类型
  if (file.type !== 'application/pdf') {
    return "只允许上传PDF格式的文件";
  }
  
  // 检查文件扩展名
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    return "文件扩展名必须为.pdf";
  }
  
  return null;
}

// 检查PDF文件头
function isPDFFile(buffer) {
  // PDF文件以 %PDF- 开头
  const pdfHeader = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2D]);
  return buffer.subarray(0, 5).equals(pdfHeader);
}

export async function POST(request) {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads", "pdfs");
    await fs.mkdir(uploadDir, { recursive: true });
    
    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "未检测到文件" }, { status: 400 });
    }
    
    // 验证PDF文件
    const validationError = validatePDFFile(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }
    
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    
    // 验证PDF文件头
    if (!isPDFFile(fileBuffer)) {
      return NextResponse.json({ error: "文件内容不是有效的PDF格式" }, { status: 400 });
    }
    
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    
    await fs.writeFile(filePath, fileBuffer);
    
    return NextResponse.json({ 
      filePath: `/uploads/pdfs/${fileName}` 
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ 
      error: "PDF文件上传失败",
      details: error.message 
    }, { status: 500 });
  }
}