"use client";

import React, { useState,useEffect } from "react";

interface PartnerLogo {
  id: number; // 假设 id 是数字类型
  src: string;
  alt: string;
  // 如果您的 API 返回了 created_at 和 updated_at 并且您可能在组件中使用它们，也可以添加
  created_at?: string;
  updated_at?: string;
}

export default function AdminPage() {
  const [bannerImage, setBannerImage] = useState("");
  const [mainSlogan, setMainSlogan] = useState("");
  const [subSlogan, setSubSlogan] = useState("");
  const [posthomedatamessage, setposthomedatamessage] = useState("");
  const [posthomedataloading, setposthomedataloading] = useState(false);

  const [ProfileText, setProfileText] = useState("");
  const [CompanyImage, setCompanyImage] = useState("");
  const [posthomeprofileloading, setposthomeprofileloading] = useState(false);
  const [posthomeprofilemessage, setposthomeprofilemessage] = useState("");

  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [postpartnerLogosloading, setpostpartnerLogosloading] = useState(false);
  const [postpartnerLogosmessage, setpostpartnerLogosmessage] = useState("");

  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>([]);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");


  useEffect(() => {
    fetchPartnerLogos();
}, [])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setposthomedataloading(true);
    setposthomedatamessage("");
    try {
      const res = await fetch("/api/posthomedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bannerImage: bannerImage,
          mainSlogan: mainSlogan,
          subSlogan: subSlogan,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setposthomedatamessage("上传成功！ID: " + data.insertId);
        setBannerImage("");
        setMainSlogan("");
        setSubSlogan("");
      } else {
        setposthomedatamessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setposthomedatamessage("请求出错: " + error);
    }
    setposthomedataloading(false);
  };

  const posthomeprofiledata = async (e: React.FormEvent) => {
    e.preventDefault();
    setposthomeprofileloading(true);
    setposthomeprofilemessage("");
    try {
      const res = await fetch("/api/posthomeprofiledata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProfileText: ProfileText,
          CompanyImage: CompanyImage,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setposthomeprofilemessage("上传成功！ID: " + data.insertId);
        setProfileText("");
        setCompanyImage("");
      } else {
        setposthomeprofilemessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setposthomeprofilemessage("请求出错: " + error);
    }
    setposthomeprofileloading(false);
  };

  const postpartnerLogos = async (e: React.FormEvent) => {
    e.preventDefault();
    setpostpartnerLogosloading(true);
    setpostpartnerLogosmessage("");
    try {
      const res = await fetch("/api/postpartnerLogos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          src: src,
          alt: alt,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setpostpartnerLogosmessage("上传成功！ID: " + data.insertId);
        setSrc("");
        setAlt("");
      } else {
        setpostpartnerLogosmessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setpostpartnerLogosmessage("请求出错: " + error);
    }
    setpostpartnerLogosloading(false);
  };

  const fetchPartnerLogos = async () => {
    try {
        const res = await fetch('/api/getpartnerLogos');
        const json = await res.json();
        if (json.data) {
            setPartnerLogos(json.data);
        } else {
            console.error('获取合作伙伴 logos 失败: 数据格式不正确', json);
            setPartnerLogos([]); // 设置为空数组以避免渲染错误
        }
    } catch (error) {
        console.error('获取合作伙伴 logos 失败:', error);
        setPartnerLogos([]); // 发生错误时也设置为空数组
    }
  };

  const deletePartnerLogo = async (alt: string) => {
    setDeleteLoading(true);
    setDeleteMessage("");
    try {
        const res = await fetch(`/api/deletepartnerLogos?alt=${encodeURIComponent(alt)}`, {
            method: 'DELETE',
        });
        const data = await res.json();

        if (res.ok) {
            setDeleteMessage(`删除成功: ${alt}`);
            // 删除后重新获取数据
            fetchPartnerLogos();
        } else {
            setDeleteMessage(`删除失败: ${data.error || '未知错误'}`);
        }
    } catch (error) {
        setDeleteMessage(`请求出错: ${error}`);
    } finally {
        setDeleteLoading(false);
    }
  };
 
//max-w-4xl mx-auto rounded-xl mt-10 p-10
  return (
      <div className="  bg-white p-10 shadow-md border">
        <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800">首页大图内容</h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Banner 图片上传 */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">大图图片（建议16/7）</label>
            <div className="flex items-center gap-4">
              <input
                  type="file"
                  accept="image/*"
                  className="border border-gray-600 rounded px-3 py-2 w-full text-gray-900"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        const response = await fetch('/api/upload', {
                          method: 'POST',
                          body: formData,
                        } as RequestInit);

                        if (response.ok) {
                          const data = await response.json();
                          setBannerImage(data.filePath);
                        } else {
                          throw new Error('上传失败');
                        }
                      } catch (error) {
                        console.error('文件上传错误:', error);
                        alert('文件上传失败，请重试');
                      }
                    }
                  }}
                  required
              />
              {bannerImage && (
                  <div className="text-sm text-gray-600">已上传: {bannerImage}</div>
              )}
            </div>
          </div>

          {/* 主标语 */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">大图标题</label>
            <input
                type="text"
                className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
                value={mainSlogan}
                onChange={(e) => setMainSlogan(e.target.value)}
                placeholder="例如：专业制造微型充气泵"
                required
            />
          </div>

          {/* 副标语 */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">大图标题内容</label>
            <textarea
                className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
                value={subSlogan}
                onChange={(e) => setSubSlogan(e.target.value)}
                placeholder="例如：资深研发团队、1500万年产能..."
                rows={5}
                required
            />
          </div>

          {/* 提交按钮 */}
          <button
              type="submit"
              className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
              disabled={posthomedataloading}
          >
            {posthomedataloading ? "上传中..." : "上传"}
          </button>

          {/* 成功信息 */}
          {posthomedatamessage && (
              <div className="mt-4 text-center text-green-600 text-lg font-medium">
                {posthomedatamessage}
              </div>
          )}
        </form>


        <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">公司简介内容</h2>
        <form onSubmit={posthomeprofiledata} className="space-y-8">
          {/* Banner 图片上传 */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">公司简介图片</label>
            <div className="flex items-center gap-4">
              <input
                  type="file"
                  accept="image/*"
                  className="border border-gray-600 rounded px-3 py-2 w-full text-gray-900"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        const response = await fetch('/api/upload', {
                          method: 'POST',
                          body: formData,
                        } as RequestInit);
                        if (response.ok) {
                          const data = await response.json();
                          setCompanyImage(data.filePath);
                        } else {
                          throw new Error('上传失败');
                        }
                      }catch (error) {
                        console.error('文件上传错误:', error);
                        alert('文件上传失败，请重试');
                      }
                    }
                  }}
                  required
              />
              {bannerImage && (
                  <div className="text-sm text-gray-600">已上传: {bannerImage}</div>
              )}
              </div>
            </div>
          {/* 公司简介内容 */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">公司简介内容</label>
            <textarea
                className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
                value={ProfileText}
                onChange={(e) => setProfileText(e.target.value)}
                placeholder="例如：我们是一家专注于微型充气泵研发与制造的高新技术企业，拥有资深的研发团队和86,666平方米现代化制造基地。年产能达1500万台，是行业标准主要起草单位，长期与国内外知名车厂合作，致力于为客户提供高品质的产品与解决方案。"
                rows={5}
                required
            />
          </div>
          {/* 提交按钮 */}
          <button
              type="submit"
              className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
              disabled={posthomeprofileloading}
          >
            {posthomeprofileloading? "上传中..." : "上传"}
          </button>
          {posthomeprofilemessage && (
              <div className="mt-4 text-center text-green-600 text-lg font-medium">
                {posthomeprofilemessage}
              </div>
          )}
          </form>

        <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">合作伙伴</h2>
        <form onSubmit={postpartnerLogos} className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">合作伙伴logo图片（大小1:1）</label>
          <div className="flex items-center gap-4">
            <input
                type="file"
                accept="image/*"
                className="border border-gray-600 rounded px-3 py-2 w-full text-gray-900"
                onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        const response = await fetch('/api/upload', {
                          method: 'POST',
                          body: formData,
                        } as RequestInit);
                        if (response.ok) {
                          const data = await response.json();
                          setSrc(data.filePath);
                        } else {
                          throw new Error('上传失败');
                        }
                      }catch (error) {
                        console.error('文件上传错误:', error);
                        alert('文件上传失败，请重试');
                      }
                    }
                  }}
                  required
              />
              {bannerImage && (
                  <div className="text-sm text-gray-600">已上传: {bannerImage}</div>
              )}
              </div>
        </div>
        <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">合作伙伴名称</label>
            <input
                type="text"
                className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="例如：奔驰，宝马"
                required
            />
        </div>
        <button
              type="submit"
              className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
              disabled={postpartnerLogosloading}
          >
            {postpartnerLogosloading ? "上传中..." : "上传"}
        </button>

          {/* 成功信息 */}
        {postpartnerLogosmessage && (
          <div className="mt-4 text-center text-green-600 text-lg font-medium">
                {postpartnerLogosmessage}
          </div>
        )}
        
                                                      
        </form>
        <div className="space-y-8 mt-8">          
          <div className="max-w-7xl mx-auto">
            <div className="overflow-x-auto">
              <div className="flex space-x-4 min-w-max px-2">                                   
                {partnerLogos.map((logo) => (               
                    <div
                        key={logo.id}            
                        className="bg-white p-2 rounded shadow hover:shadow-md transition flex flex-col items-center text-center min-w-[120px] relative"
                    >
                      <img
                          src={logo.src}
                          alt={logo.alt}
                          className="max-w-[80px] h-auto object-contain"
                      />
                      <p className="text-sm text-gray-700 mt-1">
                        {logo.alt}
                      </p>
                      <button
                        type="button"
                          onClick={() => {
                            if (window.confirm(`确定要删除「${logo.alt}」吗？`)) {
                              deletePartnerLogo(logo.alt);
                            }
                          }}
                          // onClick={() => deletePartnerLogo(logo.alt)}
                          className="mt-1 w-full bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-300"
                          disabled={deleteLoading}
                      >
                        删除
                      </button>
                    </div>
                ))}
              </div>
            </div>
          </div>
          {/* 在页面底部添加删除状态显示 */}
          {deleteMessage && (
                <div className="mt-4 text-center text-red-600 text-lg font-medium">
                  {deleteMessage}
                </div>
          )}
        </div>
      </div>
  );
}
