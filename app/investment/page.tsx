"use client";

import React, { useState, useEffect } from "react";

const recruitmentData = {
  bannerImage: "/joinus.jpg",
  bannerTitle: "加入我们",
};

const categories = [
  { id: 1, name: "全部" },
  { id: 2, name: "技术类" },
  { id: 3, name: "市场类" },
  { id: 4, name: "运营类" },
  { id: 5, name: "人力资源类" },
];

const jobs = [
  {
    id: 1,
    title: "前端开发工程师",
    category: "技术类",
    location: "北京",
    desc: "负责公司前端项目开发与维护，要求熟悉 React/Vue。",
  },
  {
    id: 2,
    title: "市场专员",
    category: "市场类",
    location: "上海",
    desc: "协助市场活动推广与品牌宣传。",
  },
  {
    id: 3,
    title: "招聘主管",
    category: "人力资源类",
    location: "深圳",
    desc: "负责公司招聘流程及团队建设。",
  },
];

export default function RecruitmentPage() {
  const { bannerImage, bannerTitle } = recruitmentData;
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const filteredJobs =
    selectedCategory === "全部"
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);

  return (
    <div>
      {/* 顶部 Banner 图 */}
      <div className="relative w-full">
        <div className="relative w-full aspect-[16/4]">
          <img
            src={bannerImage}
            alt="招聘页面背景图"
            className="w-full h-full object-cover"
          />
        </div>
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-gray-500 tracking-wide">
            {bannerTitle}
          </h1>
        </div> */}
      </div>

      {/* 内容区域 */}
      <div className="flex bg-gray-100 w-full mx-auto px-4 py-12">
        {/* 左侧分类 */}
        <div className="w-1/4 pr-6">
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold mb-4 text-gray-800">职位分类</h3>
            <ul>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={`w-full text-left px-2 py-2 rounded mb-2 transition ${
                      selectedCategory === cat.name
                        ? "bg-[#DD773F] text-white"
                        : "hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 右侧职位卡片 */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded shadow p-6 flex flex-col items-start cursor-pointer transform transition duration-200 hover:scale-105"
              onClick={() => (window.location.href = `/contact`)}
            >
              <h4 className="text-lg font-semibold mb-1 text-gray-800">
                {job.title}
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                <strong>地点：</strong> {job.location}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>类别：</strong> {job.category}
              </p>
              <p className="text-sm text-gray-700">{job.desc}</p>
              <button
                className="mt-4 px-4 py-2 bg-[#DD773F] text-white rounded hover:bg-[#c26835] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/contact`;
                }}
              >
                联系我们
              </button>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              暂无该分类下的职位
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
