
"use client";

import Image from "next/image";
import React, { useState, useEffect } from 'react'
const productsData = {
  productImage : "/products.jpg",
  productmainSlogan : "产品中心"
}

const categories = [
  { id: 1, name: "全部" },
  { id: 2, name: "胎充气修补解决方案" },
  { id: 3, name: "新能源汽车充电应用解决方案" },
  { id: 4, name: "车载防护应急包" },
  { id: 5, name: "应急电源应用解决方案" },
  { id: 6, name: "维修保养系列" },
  { id: 7, name: "供应链服务" },
    // 可根据需要添加更多分类
];


const products = [
  { id: 1, name: "智能微型充气泵", category: "胎充气修补解决方案", image: "/products/智能微型充气泵001.jpg", desc: "胎充气修补解决方案" },
  { id: 2, name: "补胎液进口原浆", category: "胎充气修补解决方案", image: "/products/补胎液进口原浆001.jpg", desc: "胎充气修补解决方案" },
  { id: 3, name: "有线充气泵", category: "胎充气修补解决方案", image: "/products/有线充气泵003.jpg", desc: "胎充气修补解决方案" },
  { id: 4, name: "充气泵", category: "胎充气修补解决方案", image: "/products/充气泵001.jpg", desc: "胎充气修补解决方案" },
  // 可根据需要添加更多产品
];

interface category {
  id: number; // 假设 id 是数字类型
  category : string;
}

interface simpleproduct{
  id: number;// 假设 id 是数字类型
  name : string;
  mainimage : string;
  category : string;
}

export default function ProductsPage() {
    const { productImage, productmainSlogan } = productsData;
    const [category, setCategory] = useState<category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("全部");

    const [simpleproduct, setsimpleproduct] = useState<simpleproduct[]>([]);

    const fetchProductCategory = async () => {
      try {
        const res = await fetch('/api/getproductcategory');
        const json = await res.json();
        if (json.data) {
          setCategory(json.data);
        } else {
          setCategory([]);
          console.error('获取分类失败: 数据格式不正确', json);
        }
      } catch (error) {
        setCategory([]);
        console.error('获取分类失败:', error);
      }
    };

    const fetchsimpleProduct = async () => {
      try {
        const res = await fetch('/api/getproductsimpledata');
        const json = await res.json();
        if (json.data) {
          setsimpleproduct(json.data);
        } else {
          setsimpleproduct([]);
          console.error('获取简单产品失败: 数据格式不正确', json);
        }
      } catch (error) {
        setsimpleproduct([]);
        console.error('获取简单产品失败:', error);
      }
    };

    useEffect(() => {
      fetchProductCategory();
      fetchsimpleProduct();
    }, []);

    useEffect(() => {
      if (category.length > 0) {
        setSelectedCategory(category[0].category);
      }
    }, [category]);

    // 过滤产品
    const filteredProducts =
      selectedCategory === "全部"
        ? simpleproduct
        : simpleproduct.filter((p) => p.category === selectedCategory);

    return (
    <div>
      {/* 顶部大图 */}
      <div className="relative w-full">
              {/* 背景图容器，自动按比例撑高 */}
              <div className="relative w-full aspect-[16/4]">
                  <Image
                      src={productImage}
                      alt="首页背景图"
                      fill
                      style={{objectFit: "cover"}}
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

        <div className="flex bg-gray-100 w-full mx-auto px-4 py-12">
  {/* 左侧分类 */}
          <div className="w-1/4 pr-6">
            <div className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-bold mb-4 text-gray-800">分类</h3>
              <ul>
                {category.map((cat) => (
                  <li key={cat.id}>
                    <button
                      className={`w-full text-left px-2 py-2 rounded mb-2 transition ${
                        selectedCategory === cat.category
                          ? "bg-[#DD773F] text-white"
                          : "hover:bg-gray-300 text-gray-700"
                      }`}
                      onClick={() => setSelectedCategory(cat.category)}
                    >
                      {cat.category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 右侧产品展示等你自己放 */}


        {/* 右侧产品 */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded shadow p-4 flex flex-col items-center cursor-pointer transform transition duration-200 hover:scale-105"
              onClick={() => window.location.href = `/productdetail1/${product.id}`}
            >
              <img
                src={product.mainimage}
                alt={product.name}
                className="w-32 h-32 object-cover mb-2"
              />
              <h4 className="text-base font-semibold mb-1 text-gray-700">{product.name}</h4>
              {/* <p className="text-sm text-gray-600 mb-2">{product.desc}</p> */}
              <button
                className="mt-2 px-4 py-2 bg-[#DD773F] text-white rounded hover:bg-[#c26835] transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // 防止触发父元素的点击事件
                  console.log("跳转到产品详情页");// 跳转到产品详情页
                  window.location.href = `/productdetail1/${product.id}`;
                  console.log("跳转到产品详情页11");
                }}
              >
                查看详情
              </button>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              暂无该分类下的产品
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
