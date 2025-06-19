"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from 'react';

const productsData = {
    productImage: "/news.jpg",
    productmainSlogan: "资讯中心"
};

type NewsItem = {
    id: number;
    title: string;
    summary: string;
    pdfUrl: string;
    createdAt: string;
};

export default function NewsPage() {
    const { productImage, productmainSlogan } = productsData;

    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    const fetchNewsData = async () => {
        try {
            const res = await fetch('/api/getnewData');
            const json = await res.json();
            if (json.data) {
                setNewsList(json.data);
            } else {
                setNewsList([]);
                console.error('获取新闻失败: 数据格式不正确', json);
            }
        } catch (error) {
            setNewsList([]);
            console.error('获取新闻失败:', error);
        }
    };

    useEffect(() => {
        fetchNewsData();
    }, []);


    return (
        <div className="bg-white">
            <div className="relative w-full">
                {/* 背景图容器，自动按比例撑高 */}
                <div className="relative w-full aspect-[16/4]">
                    <Image
                        src={productImage}
                        alt="首页背景图"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
                {/* 内容部分 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#DD773F]">
                        {productmainSlogan}
                    </h1>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-20 px-6 py-10">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">新闻资讯</h2>

                <div className="space-y-8">
                    {newsList.map((news, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedPdf(news.pdfUrl)}
                            className="cursor-pointer border rounded-2xl p-6 shadow hover:shadow-lg transition hover:bg-gray-50"
                        >
                            <h3 className="text-xl font-semibold text-[#333] mb-2">{news.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{new Date(news.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-700">{news.summary}</p>
                            <span className="text-blue-500 underline mt-2 inline-block">点击查看 PDF</span>
                        </div>
                    ))}
                </div>
                {/* 弹窗展示 PDF */}
                {selectedPdf && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-0"> {/* Changed bg-opacity-1 to bg-opacity-0 */}
                        <div className="bg-white w-[90%] h-[80%] rounded-lg overflow-hidden shadow-xl relative">
                            {/* 关闭按钮 */}
                            <button
                                onClick={() => setSelectedPdf(null)}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-3xl text-white hover:text-black hover:bg-gray-200 transition"
                            >
                                ×
                            </button>

                            {/* PDF 显示区域 */}
                            <iframe
                                src={selectedPdf}
                                title="新闻 PDF"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>


        </div>


    );
}
