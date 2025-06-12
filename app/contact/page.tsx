"use client";

import Image from "next/image";
import React from "react";

const contactBg = "/contact-bg.jpg"; // 请替换为你自己的大图路径

export default function ContactPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* 背景图容器 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={contactBg}
          alt="Contact Background"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-90"
          priority
        />
      </div>

      {/* 内容容器 */}
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 py-16 bg-white/80 backdrop-blur-sm rounded-lg m-6 md:mx-24 shadow-lg">
        {/* 左侧联系信息 */}
        <div className="md:w-1/2 w-full mb-10 md:mb-0 pr-0 md:pr-12">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">联系我们</h2>
          <div className="text-sm space-y-4 text-gray-600">
            <p><span className="font-semibold">公司地址：</span>奉炮公路19999号</p>
            <p><span className="font-semibold">工厂地址：</span>宝山山路10002号</p>
            <p><span className="font-semibold">联系电话：</span>15000256347</p>
            <p><span className="font-semibold">邮箱：</span>Daniel.sun815@outlook.com</p>
          </div>
        </div>

        {/* 右侧表单 */}
        <div className="md:w-1/2 w-full bg-white p-10 shadow-md border rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">在线留言</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">称呼</label>
              <input
                type="text"
                placeholder="请输入您的称呼"
                className="w-full border border-gray-500 rounded px-4 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DD773F]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">联系方式</label>
              <input
                type="text"
                placeholder="手机号或邮箱"
                className="w-full border border-gray-500 rounded px-4 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DD773F]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">目的</label>
              <select
                className="w-full border border-gray-500 rounded px-4 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DD773F]"
              >
                <option>加入我们</option>
                <option>合作资讯</option>
                <option>咨询购买</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#DD773F] text-white py-2 px-4 rounded hover:bg-[#c26835] transition-colors"
            >
              提交信息
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
