"use client";

import React, { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  category: string;
  location: string;
  description?: string;
}

export default function RecruitmentPage() {
  const [bannerImage, setBannerImage] = useState("/joinus.jpg");
  const [bannerTitle, setBannerTitle] = useState("加入我们");

  const [categories, setCategories] = useState<string[]>(["全部"]);
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchRecruitmentSettings = async () => {
      try {
        const res = await fetch("/api/getrecruitmentsettings");
        const json = await res.json();
        const data = json?.data;
        if (data) {
          setBannerImage(data.bannerImage || "/joinus.jpg");
          setBannerTitle(data.bannerTitle || "加入我们");
        }
      } catch (error) {
        console.error("获取招聘设置失败:", error);
      }
    };

    const fetchJobCategories = async () => {
      try {
        const res = await fetch("/api/getjobcategories");
        const json = await res.json();
        const list = Array.isArray(json?.data)
          ? json.data.map((row: any) => row.category).filter(Boolean)
          : [];
        setCategories(["全部", ...list]);
      } catch (error) {
        console.error("获取职位分类失败:", error);
        setCategories(["全部"]);
      }
    };

    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/getjobs");
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : [];
        setJobs(list);
      } catch (error) {
        console.error("获取职位列表失败:", error);
        setJobs([]);
      }
    };

    fetchRecruitmentSettings();
    fetchJobCategories();
    fetchJobs();
  }, []);

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
      </div>
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#DD773F]">
            我们期待与志同道合的伙伴携手创业
          </h2>
          <p className="mt-3 text-gray-700">
            如果你认同我们的使命与价值观，欢迎联系并加入我们，一起把好产品带给更多用户，共创长期价值。
          </p>
          <p className="mt-3 text-gray-700">
            我们正在寻找在产品、渠道、运营、技术等方向具有经验的伙伴。无论你是个人创业者还是成熟团队，我们希望以开放、务实的方式共担风险、共享收益。
          </p>
          <p className="mt-3 text-gray-700">
            我们提供透明的合作机制、稳定的供应链与持续的产品迭代能力，期待与你深入沟通，探索更大的可能性。
          </p>
          <div className="mt-6">
            <a href="/contact" className="inline-block rounded-md bg-[#DD773F] px-5 py-2 text-white hover:opacity-90 transition">
              与我们聊聊
            </a>
          </div>
        </div>
      </section>


      {/* 内容区域 */}
      <div className="flex bg-gray-100 w-full mx-auto px-4 py-12">
        {/* 左侧分类 */}
        <div className="w-1/4 pr-6">
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold mb-4 text-gray-800">职位分类</h3>
            <ul>
              {categories.map((name, idx) => (
                <li key={`${name}-${idx}`}>
                  <button
                    className={`w-full text-left px-2 py-2 rounded mb-2 transition ${
                      selectedCategory === name
                        ? "bg-[#DD773F] text-white"
                        : "hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setSelectedCategory(name)}
                  >
                    {name}
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
              {job.description && (
                <p className="text-sm text-gray-700">{job.description}</p>
              )}
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
