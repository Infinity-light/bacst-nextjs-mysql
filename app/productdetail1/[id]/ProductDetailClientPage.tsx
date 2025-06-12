'use client';

import React, { useEffect, useState } from 'react';
// 引入Swiper核心组件和SwiperSlide子组件
import { Swiper, SwiperSlide } from 'swiper/react';
// 引入Swiper基础样式
import 'swiper/css';
// 引入导航按钮样式
import 'swiper/css/navigation';
// 引入分页器样式
import 'swiper/css/pagination';
// 引入需要的Swiper功能模块
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

interface Product {
  id: string;
  name: string;
  description: string;
  mainimage: string;
  category?: string;
  images: string[];
  specs: [string, string][];
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  id: string;
}

export default function ProductDetailClientPage({ id }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    console.log('开始请求产品数据，id=', id);
    try {
      const res = await fetch(`/api/getproductdata?id=${id}`);
      console.log('请求返回，状态码：', res.status);
      if (!res.ok) {
        throw new Error('获取产品失败，状态码：' + res.status);
      }
      const json = await res.json();
      console.log('接口返回数据：', json);
      setProduct(json.data);
    } catch (err) {
      console.error('fetch error:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div>发生错误：{error}</div>;
  if (!product) return <div>产品不存在。</div>;

  return (
      <div className="mx-auto p-6 bg-white shadow-lg">
        {/*<div className="mb-8">*/}
        {/*  <h1 className="text-3xl font-bold text-gray-800 mb-2 ">{product.name}</h1>*/}
        {/*</div>*/}
        <div className="max-w-6xl mx-auto mb-16">
          {/* 这个 div 用于处理两栏布局（左侧图片，右侧信息）*/}
          <div className="flex flex-col md:flex-row gap-[60px]">
              {/* 左栏：产品图片轮播 */}
            <div className="md:w-[55%] w-full max-w-[500px]">
              <h2 className="text-2xl font-semibold mb-6 text-[#DD773F]">产品展示</h2>
              {/* 左侧产品图片 */}
              <div className="flex-1 max-w-[500px]">
                <Swiper
                    modules={[Pagination]}
                    pagination={{clickable: true}}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop
                    className="rounded-lg shadow-md"
                >
                  {product.images.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="aspect-[16/9]">
                          <img
                              src={img}
                              alt={`${product.name} 图片 ${idx + 1}`}
                              className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="md:w-[45%] w-full"> {/* 这是右栏内容的容器 */}
              {/* 你提供的新的详细产品信息代码片段 */}
              <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 ">{product.name}</h1>
                <h2 className="text-2xl font-semibold text-[#DD773F]">产品简介</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </div>

        {product.specs.length > 0 && (
            <div className="max-w-6xl mx-auto mb-16">
              <h2 className="text-2xl font-semibold mb-4 text-[#DD773F]">规格参数</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-1 text-left text-gray-700">参数名</th>
                    <th className="border px-4 py-1 text-left text-gray-600">参数值</th>
                  </tr>
                  </thead>
                  <tbody>
                  {product.specs.map(([key, value], index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border px-4 py-1 font-medium text-gray-500">{key}</td>
                        <td className="border px-4 py-1 text-gray-500">{value}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
        )}
      </div>
  )
}

