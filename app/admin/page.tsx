"use client";

import React, { useState, useEffect } from "react";

interface PartnerLogo {
  id: number; // 假设 id 是数字类型
  src: string;
  alt: string;
  // 如果您的 API 返回了 created_at 和 updated_at 并且您可能在组件中使用它们，也可以添加
  created_at?: string;
  updated_at?: string;
}

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

export default function AdminPage() {
  const [apiKey, setApiKey] = useState<string>("");

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

  const [category, setCategory] = useState("");
  const [postproduct_categoriesloading, setpostproduct_categoriesloading] = useState(false);
  const [postproduct_categoriesmessage, setpostproduct_categoriesmessage] = useState("");

  const [categoryToDelete, setCategoryToDelete] = useState("");
  const [deleteproduct_categoriesLoading, setDeleteproduct_categoriesLoading] = useState(false);
  const [deleteproduct_categoriesMessage, setDeleteproduct_categoriesMessage] = useState("");

  const [product, setProducts] = useState<Product[]>([]);
  const [deleteproductsLoading, setDeleteproductsLoading] = useState(false);
  const [deleteproductsMessage, setDeleteproductsMessage] = useState("");

  const [name, setName] = useState("");
  const [productcategory, setProductCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mainimage, setMainimage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [specs, setSpecs] = useState<[string, string][]>([]);
  const [postproductsloading, setpostproductsloading] = useState(false);
  const [postproductsmessage, setpostproductsmessage] = useState("");

  const [contactBg, setContactBg] = useState("");
  const [email, setEmail] = useState("");
  const [adddress, setAdddress] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [postaddressloading, setpostaddressloading] = useState(false);
  const [postaddressmessage, setpostaddressmessage] = useState("");

  const [aboutBanner, setAboutBanner] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [postaboutDataloading, setpostaboutDataloading] = useState(false);
  const [postaboutDatamessage, setpostaboutDatamessage] = useState("");

  const [AboutText, setAboutText] = useState("");
  const [AboutImage, setAboutImage] = useState("");
  const [postaboutdetailDataloading, setpostaboutdetailDataloading] = useState(false);
  const [postaboutdetailDatamessage, setpostaboutdetailDatamessage] = useState("");

  const [brandIntroduction, setBrandIntroduction] = useState("");
  const [operationImage, setOperationImage] = useState("");
  const [managementIdea, setManagementIdea] = useState("");
  const [declaration, setDeclaration] = useState<string[]>([]);
  const [postcompanyCultureloading, setpostcompanyCultureloading] = useState(false);
  const [postcompanyCulturemessage, setpostcompanyCulturemessage] = useState("");

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [postnewDataLoading, setPostnewDataLoading] = useState(false);
  const [postnewDatamessage, setPostnewDatamessage] = useState("");

  const [deletetotitle, setDeletetotitle] = useState("");
  const [deletenewsLoading, setDeletenewsLoading] = useState(false);
  const [deletenewsMessage, setDeletenewsMessage] = useState("");

  const [jd, setJd] = useState("");
  const [dy, setDy] = useState("");
  const [wx, setWx] = useState("");
  const [wxgzh, setWxgzh] = useState("");
  const [postshopURLDataloading, setPostshopURLDataloading] = useState(false);
  const [postshopURLDatamessage, setPostshopURLDatamessage] = useState("");

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
          "x-api-key": apiKey  // ✅ 正确写法
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
          "x-api-key": apiKey
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
          "x-api-key": apiKey
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
        headers: {
          "x-api-key": apiKey
        },
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

  const postproduct_categories = async (e: React.FormEvent) => {
    e.preventDefault();
    setpostproduct_categoriesloading(true);
    setpostproduct_categoriesmessage("");
    try {
      const res = await fetch("/api/postproduct_categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          category: category,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setpostproduct_categoriesmessage("上传成功！ID: " + data.insertId);
        setCategory("");
      } else {
        setpostproduct_categoriesmessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setpostproduct_categoriesmessage("请求出错: " + error);
    }
    setpostproduct_categoriesloading(false);
  };

  const deleteproduct_categories = async (category: string) => {
    setDeleteproduct_categoriesLoading(true);
    setDeleteproduct_categoriesMessage("");
    try {
      const res = await fetch(`/api/deletecategory?category=${encodeURIComponent(category)}`, {
        method: 'DELETE',
        headers: {
          "x-api-key": apiKey
        },
      });
      const data = await res.json();

      if (res.ok) {
        setDeleteproduct_categoriesMessage(`删除成功: ${category}`);
      } else {
        setDeleteproduct_categoriesMessage(`删除失败: ${data.error || '未知错误'}`);
      }
    } catch (error) {
      setDeleteproduct_categoriesMessage(`请求出错: ${error}`);
    } finally {
      setDeleteproduct_categoriesLoading(false);
    }
  };

  const postproducts = async (e: React.FormEvent) => {
    e.preventDefault();
    setpostproductsloading(true);
    setpostproductsmessage("");
    try {
      const res = await fetch("/api/postproductdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          name: name,
          description: description,
          mainimage: mainimage,
          category: productcategory,
          images: JSON.stringify(images),  // string[]
          specs: JSON.stringify(specs),    // [string, string][]
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setpostproductsmessage("上传成功！ID: " + data.insertId);
        setName("");
        setDescription("");
        setMainimage("");
        setProductCategory("");
        setImages([]);
        setSpecs([]);
      } else {
        setpostproductsmessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setpostproductsmessage("请求出错: " + error);
    }
    setpostproductsloading(false);
  };

  const deleteproducts = async (name: string) => {
    setDeleteproductsLoading(true);
    setDeleteproductsMessage("");
    try {
      const res = await fetch(`/api/deleteproductdata?name=${encodeURIComponent(name)}`, {
        method: 'DELETE',
        headers: {
          "x-api-key": apiKey
        },
      });
      const data = await res.json();

      if (res.ok) {
        setDeleteproductsMessage(`删除成功: ${name}`);
      } else {
        setDeleteproductsMessage(`删除失败: ${data.error || '未知错误'}`);
      }
    } catch (error) {
      setDeleteproductsMessage(`请求出错: ${error}`);
    } finally {
      setDeleteproductsLoading(false);
    }
  };

  const postaddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setpostaddressloading(true);
    setpostaddressmessage("");
    try {
      const res = await fetch("/api/postaddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          contactBg: contactBg,
          email: email,
          address: address,
          phone: phone,
          adddress: adddress,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setpostaddressmessage("上传成功！ID: " + data.insertId);
        setContactBg("");
        setEmail("");
        setAddress("");
        setPhone("");
        setAdddress("");
      } else {
        setpostaddressmessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setpostaddressmessage("请求出错: " + error);
    }
    setpostaddressloading(false);
  };

  const postaboutData = async (e: React.FormEvent) => {
    e.preventDefault();
    setpostaboutDataloading(true);
    setpostaboutDatamessage("");
    try {
      const res = await fetch("/api/postaboutdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          aboutBanner: aboutBanner,
          mainTitle: mainTitle,
          subTitle: subTitle,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setpostaboutDatamessage("上传成功！ID: " + data.insertId);
        setAboutBanner("");
        setMainTitle("");
        setSubTitle("");
      } else {
        setpostaboutDatamessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setpostaboutDatamessage("请求出错: " + error);
    }
    setpostaboutDataloading(false);
  };

  const postaboutdetailData = async (e: React.FormEvent) => {
    e.preventDefault();
    setpostaboutdetailDataloading(true);
    setpostaboutdetailDatamessage("");
    try {
      const res = await fetch("/api/postaboutdetaildata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          AboutText: AboutText,
          AboutImage: AboutImage,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setpostaboutdetailDatamessage("上传成功！ID: " + data.insertId);
        setAboutText("");
        setAboutImage("");
      } else {
        setpostaboutdetailDatamessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setpostaboutdetailDatamessage("请求出错: " + error);
    }
    setpostaboutDataloading(false);
  };

  const postcompanyCulture = async (e: React.FormEvent) => {
    e.preventDefault();
    setpostcompanyCultureloading(true);
    setpostcompanyCulturemessage("");
    try {
      const res = await fetch("/api/postcompanyCulture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          brandIntroduction: brandIntroduction,
          operationImage: operationImage,
          managementIdea: managementIdea,
          declaration: JSON.stringify(declaration), // 发送到数据库（存 JSON）
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setpostcompanyCulturemessage("上传成功！ID: " + data.insertId);
        setBrandIntroduction("");
        setOperationImage("");
        setManagementIdea("");
        setDeclaration([]);
      } else {
        setpostcompanyCulturemessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setpostcompanyCulturemessage("请求出错: " + error);
    }
    setpostcompanyCultureloading(false);
  };

  const postnews = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostnewDataLoading(true);
    setPostnewDatamessage("");
    try {
      const res = await fetch("/api/postnews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          title: title,
          summary: summary,
          pdfUrl: pdfUrl,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPostnewDatamessage("上传成功！ID: " + data.insertId);
        setTitle("");
        setSummary("");
        setPdfUrl("");
      } else {
        setPostnewDatamessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setPostnewDatamessage("请求出错: " + error);
    }
    setPostnewDataLoading(false);
  };

  const deletenews = async (deletetotitle: string) => {
    setDeletenewsLoading(true);
    setDeletenewsMessage("");
    try {
      const res = await fetch(`/api/deletenews?title=${encodeURIComponent(deletetotitle)}`, {
        method: 'DELETE',
        headers: {
          "x-api-key": apiKey
        },
      });
      const data = await res.json();

      if (res.ok) {
        setDeletenewsMessage(`删除成功: ${deletetotitle}`);
        // 删除后重新获取数据
      } else {
        setDeletenewsMessage(`删除失败: ${data.error || '未知错误'}`);
      }
    } catch (error) {
      setDeletenewsMessage(`请求出错: ${error}`);
    } finally {
      setDeletenewsLoading(false);
    }
  };

  const postshopURLData = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostshopURLDataloading(true);
    setPostshopURLDatamessage("");
    try {
      const res = await fetch("/api/postshopURLData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          jd: jd,
          dy: dy,
          wx: wx,
          wxgzh: wxgzh,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPostshopURLDatamessage("上传成功！ID: " + data.insertId);
        setJd("");
        setDy("");
        setWx("");
        setWxgzh("");
      } else {
        setPostshopURLDatamessage("上传失败: " + (data.error || "未知错误"));
      }
    } catch (error) {
      setPostshopURLDatamessage("请求出错: " + error);
    }
    setPostshopURLDataloading(false);
  };

  //max-w-4xl mx-auto rounded-xl mt-10 p-10
  return (
    <div className="  bg-white p-10 shadow-md border">
      {/* API Key 输入框 - 置顶显示 */}
      <div className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">API 访问密钥</h2>
        <div className="flex items-center gap-4">
          <label className="text-lg font-medium text-blue-700 min-w-[100px]">API Key:</label>
          <input
            type="password"
            className="flex-1 border border-blue-300 px-4 py-3 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="请输入您的API密钥..."
          />
          <div className={`px-3 py-2 rounded text-sm ${apiKey ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {apiKey ? '✓ 已设置' : '⚠ 未设置'}
          </div>
        </div>
        <p className="text-sm text-blue-600 mt-2">
          💡 此API密钥将用于所有数据操作请求的身份验证
        </p>
      </div>
      {/* ----------------------------------------------- */}
      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800">首页大图内容</h2>
      {/* 添加大图内容 */}
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
      {/* ----------------------------------------------- */}
      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">公司简介内容</h2>
      {/* 添加公司简介内容 */}
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
          {posthomeprofileloading ? "上传中..." : "上传"}
        </button>
        {posthomeprofilemessage && (
          <div className="mt-4 text-center text-green-600 text-lg font-medium">
            {posthomeprofilemessage}
          </div>
        )}
      </form>
      {/* ----------------------------------------------- */}

      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">合作伙伴</h2>
      {/* 添加合作伙伴 */}
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
      {/* ----------------------------------------------- */}

      {/* 删除合作伙伴 */}
      <div className="space-y-8 mt-8">
        <div >
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
                    className="mt-1 w-full bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 text-sm px-2 py-2 rounded-md"
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
      {/* ----------------------------------------------- */}

      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">产品分类</h2>
      {/* 添加产品分类 */}
      <form onSubmit={postproduct_categories} className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">添加产品分类</label>
          <input
            type="text"
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="例如：微型发动机"
            required
          />
        </div>
        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
          disabled={postproduct_categoriesloading}
        >
          {postproduct_categoriesloading ? "上传中..." : "上传"}
        </button>
        {/* 成功信息 */}
        {postproduct_categoriesmessage && (
          <div className="mt-4 text-center text-green-600 text-lg font-medium">
            {postproduct_categoriesmessage}
          </div>
        )}
      </form>
      {/* ----------------------------------------------- */}

      {/* 删除产品分类 */}
      <div className="space-y-8 mt-8">
        <div >
          <label className="block text-lg font-medium text-gray-700 mb-2">删除产品分类</label>

          <div className="flex items-center space-x-4">
            {/* 输入框 */}
            <input
              type="text"
              placeholder="输入要删除的分类名称"
              value={categoryToDelete}
              onChange={(e) => setCategoryToDelete(e.target.value)}
              className="flex-1 border border-gray-600 px-4 py-2 rounded text-gray-900"
            />
            {/* 删除按钮 */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`确定要删除「${categoryToDelete}」吗？`)) {
                  deleteproduct_categories(categoryToDelete);
                }
              }}
              className="min-w-[120px] bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 text-base px-4 py-2 rounded-md"
              disabled={deleteproduct_categoriesLoading}
            >
              删除
            </button>
          </div>
        </div>
        {/* 在页面底部添加删除状态显示 */}
        {deleteproduct_categoriesMessage && (
          <div className="mt-4 text-center text-red-600 text-lg font-medium">
            {deleteproduct_categoriesMessage}
          </div>
        )}
      </div>
      {/* ----------------------------------------------- */}

      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">产品添加</h2>
      {/* 添加产品 */}
      <form onSubmit={postproducts} className="space-y-8">
        {/* 添加产品名字与分类 */}
        <div className="flex flex-wrap gap-6">
          {/* 产品名称 */}
          <div className="flex-1 min-w-[280px]">
            <label className="block text-lg font-medium text-gray-700 mb-2">产品名称</label>
            <input
              type="text"
              className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：充气泵，充电桩"
              required
            />
          </div>

          {/* 产品分类 */}
          <div className="flex-1 min-w-[280px]">
            <label className="block text-lg font-medium text-gray-700 mb-2">产品分类</label>
            <input
              type="text"
              className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
              value={productcategory}
              onChange={(e) => setProductCategory(e.target.value)}
              placeholder="例如：胎充气修补解决方案"
              required
            />
          </div>
        </div>

        {/* 产品描述 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">产品描述</label>
          <textarea
            rows={5}
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例如：这款智能微型充气泵采用高精度集成芯片..."
            required
          />
        </div>

        {/* 产品主要图片 */}
        <div className="items-center gap-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">产品主要图片</label>
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
                    setMainimage(data.filePath)
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
          {mainimage && (
            <div className="text-sm text-gray-600">已上传: {mainimage}</div>
          )}
        </div>

        {/* 产品多图 */}
        <div className="space-y-4">

          <label className="block text-lg font-medium text-gray-700 mb-2">产品多图</label>
          <p className="text-sm text-gray-500">可以选择多个图片文件同时上传</p>
          {/* 显示已添加的图片 */}
          {images.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">已添加图片:</p>
              {images.map((imagePath, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <span className="text-sm text-gray-700">{imagePath}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = images.filter((_, i) => i !== index);
                      setImages(newImages);
                    }}
                    className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800  px-3 py-2 text-sm rounded-md font-medium"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 添加新图片 */}
          <input
            type="file"
            accept="image/*"
            multiple
            className="border border-gray-600 rounded px-3 py-2 w-full text-gray-900"
            onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 0) {
                const uploadPromises = files.map(async (file) => {
                  const formData = new FormData();
                  formData.append('file', file);
                  try {
                    const response = await fetch('/api/upload', {
                      method: 'POST',
                      body: formData,
                    } as RequestInit);
                    if (response.ok) {
                      const data = await response.json();
                      return data.filePath;
                    } else {
                      throw new Error('上传失败');
                    }
                  } catch (error) {
                    console.error('文件上传错误:', error);
                    alert(`文件 ${file.name} 上传失败，请重试`);
                    return null;
                  }
                });

                try {
                  const uploadedPaths = await Promise.all(uploadPromises);
                  const validPaths = uploadedPaths.filter(path => path !== null);
                  if (validPaths.length > 0) {
                    setImages([...images, ...validPaths]);
                  }
                } catch (error) {
                  console.error('批量上传错误:', error);
                }

                // 清空input
                e.target.value = '';
              }
            }}
          />

        </div>

        {/* 产品规格 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-lg font-medium text-gray-700">产品规格参数</label>
            <button
              type="button"
              onClick={() => {
                setSpecs([...specs, ['', '']]);
              }}
              className="bg-[#DD773F] text-white px-3 py-1 rounded hover:bg-[#c05e2d] text-sm font-medium"
            >
              + 添加规格
            </button>
          </div>

          {/* 显示已添加的规格 */}
          {specs.length > 0 && (
            <div className="space-y-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="规格名称（如：罐体耐压）"
                      value={spec[0]}
                      onChange={(e) => {
                        const newSpecs = [...specs];
                        newSpecs[index][0] = e.target.value;
                        setSpecs(newSpecs);
                      }}
                      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 text-sm"
                    />
                  </div>
                  <div className="flex-2">
                    <input
                      type="text"
                      placeholder="规格值（如：变形压力≥1.8MPa 爆破压力≥2.0MPa）"
                      value={spec[1]}
                      onChange={(e) => {
                        const newSpecs = [...specs];
                        newSpecs[index][1] = e.target.value;
                        setSpecs(newSpecs);
                      }}
                      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newSpecs = specs.filter((_, i) => i !== index);
                      setSpecs(newSpecs);
                    }}
                    className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 提示信息 */}
          {specs.length === 0 && (
            <div className="text-gray-500 text-sm bg-gray-50 p-3 rounded">
              暂无规格信息，点击"添加规格"按钮开始添加产品规格参数
            </div>
          )}

          {/* 规格预览 */}
          {specs.length > 0 && (
            <div className="p-4 bg-[#e3976d] rounded-lg shadow-md">
              <p className="text-base font-semibold text-white mb-3">📦 规格预览：</p>
              <div className="space-y-1">
                {specs
                  .filter(spec => spec[0] && spec[1])
                  .map((spec, index) => (
                    <div key={index} className="text-white text-sm">
                      <span className="font-semibold">{spec[0]}:</span> <span className="opacity-90">{spec[1]}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* 上传按钮 */}
        <button
          type="submit"
          className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
          disabled={postproductsloading}
        >
          {postproductsloading ? "上传中..." : "上传"}
        </button>
        {/* 成功信息 */}
        {postproductsmessage && (
          <div className="mt-4 text-center text-green-600 text-lg font-medium">
            {postproductsmessage}
          </div>
        )}

      </form>
      {/* ----------------------------------------------- */}

      {/* 删除产品 */}
      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">产品删除</h2>
      <div className="space-y-8 mt-8">
        <div >
          <label className="block text-lg font-medium text-gray-700 mb-2">删除产品</label>

          <div className="flex items-center space-x-4">
            {/* 输入框 */}
            <input
              type="text"
              placeholder="输入要删除的产品名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border border-gray-600 px-4 py-2 rounded text-gray-900"
            />
            {/* 删除按钮 */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`确定要删除「${name}」吗？`)) {
                  deleteproducts(name);
                }
              }}
              className="min-w-[120px] bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 text-base px-4 py-2 rounded-md"
              disabled={deleteproductsLoading}
            >
              删除
            </button>
          </div>
        </div>
        {/* 在页面底部添加删除状态显示 */}
        {deleteproductsMessage && (
          <div className="mt-4 text-center text-red-600 text-lg font-medium">
            {deleteproductsMessage}
          </div>
        )}
      </div>
      {/* ----------------------------------------------- */}

      {/* 添加联系方式信息 */}
      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">添加联系方式信息</h2>
      <form onSubmit={postaddress} className="space-y-8">
        {/* 联系背景图 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">联系方式背景大图图片</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
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
                      setContactBg(data.filePath);
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
          </div>
          {contactBg && (
            <div className="text-sm text-gray-600">已上传: {contactBg}</div>
          )}
        </div>

        {/* 联系邮箱 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">联系邮箱</label>
          <input
            type="text"
            placeholder="联系邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
          />
        </div>

        {/* 联系地址 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">公司地址</label>
          <input
            type="text"
            placeholder="公司地址"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
          />
        </div>
        {/* 联系电话 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">联系电话</label>
          <input
            type="text"
            placeholder="联系电话"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
          />
        </div>
        {/* 工厂地址 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">工厂地址</label>
          <input
            type="text"
            placeholder="工厂地址"
            value={adddress}
            onChange={(e) => setAdddress(e.target.value)}
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
          />
        </div>
        {/* 上传按钮 */}
        <button
          type="submit"
          className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
          disabled={postaddressloading}
        >
          {postaddressloading ? "上传中..." : "上传"}
        </button>
        {/* 成功信息 */}
        {postaddressmessage && (
          <div className="mt-4 text-center text-green-600 text-lg font-medium">
            {postaddressmessage}
          </div>
        )}
      </form>
      {/* ----------------------------------------------- */}

      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">关于公司大图修改</h2>
      <form onSubmit={postaboutData} className="space-y-8">

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
                    setAboutBanner(data.filePath);
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
          {aboutBanner && (
            <div className="text-sm text-gray-600">已上传: {aboutBanner}</div>
          )}
        </div>

        <label className="block text-lg font-medium text-gray-700 mb-2">大图介绍大标题</label>
        <input
          type="text"
          placeholder="大标题"
          value={mainTitle}
          onChange={(e) => setMainTitle(e.target.value)}
          className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
        />

        <label className="block text-lg font-medium text-gray-700 mb-2">大图介绍副标题</label>
        <input
          type="text"
          placeholder="副标题"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
        />
        {/* 上传按钮 */}
        <button
          type="submit"
          className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
          disabled={postaboutDataloading}
        >
          {postaboutDataloading ? "上传中..." : "上传"}
        </button>

        {/* 成功信息 */}
        {postaboutDatamessage && (
          <div className="mt-4 text-center text-green-600 text-lg font-medium">
            {postaboutDatamessage}
          </div>
        )}
      </form>
      {/* ----------------------------------------------- */}

      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">关于公司具体内容修改</h2>
      <form onSubmit={postaboutdetailData} className="space-y-8">
        {/* 公司简介内容 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">公司具体简介内容</label>
          <textarea
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
            value={AboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="例如：我们是一家专注于微型充气泵研发与制造的高新技术企业，拥有资深的研发团队和86,666平方米现代化制造基地。年产能达1500万台，是行业标准主要起草单位，长期与国内外知名车厂合作，致力于为客户提供高品质的产品与解决方案。"
            rows={5}
            required
          />
        </div>
        {/* 公司简介内容配图 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">公司具体简介内容配图</label>
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
                      setAboutImage(data.filePath);
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
            {AboutImage && (
              <div className="text-sm text-gray-600">已上传: {AboutImage}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
            disabled={postaboutdetailDataloading}
          >
            {postaboutdetailDataloading ? "上传中..." : "上传"}
          </button>

          {/* 成功信息 */}
          {postaboutdetailDatamessage && (
            <div className="mt-4 text-center text-green-600 text-lg font-medium">
              {postaboutdetailDatamessage}
            </div>
          )}
        </div>
      </form>
      {/* ----------------------------------------------- */}

      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">关于公司公司文化修改</h2>
      <form onSubmit={postcompanyCulture} className="space-y-8">
        {/* 公司简介内容 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">品牌介绍</label>
          <textarea
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
            value={brandIntroduction}
            onChange={(e) => setBrandIntroduction(e.target.value)}
            placeholder="例如：巴克斯通以智能微型多功能车载充气泵，轮胎应急补胎工具，新能源汽车充电桩及车载应急包为核心产品，凭借卓..."
            rows={5}
            required
          />
        </div>
        {/* 公司简介内容配图 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">业务开展配图</label>
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
                      setOperationImage(data.filePath);
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
            {operationImage && (
              <div className="text-sm text-gray-600">已上传: {operationImage}</div>
            )}
          </div>
        </div>
        {/* 经营理念 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">经营理念</label>
          <textarea
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
            value={managementIdea}
            onChange={(e) => setManagementIdea(e.target.value)}
            placeholder="例如：公司坚持‘以人为本、顾客至上、持续经营、技术创新’为经营宗旨，努力发展壮大公司团队和规模！"
            rows={5}
            required
          />
        </div>

        {/* 服务宣言 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-lg font-medium text-gray-700">服务宣言</label>
            <button
              type="button"
              onClick={() => setDeclaration([...declaration, ""])}
              className="bg-[#DD773F] text-white px-3 py-1 rounded hover:bg-[#c05e2d] text-sm font-medium"
            >
              + 添加宣言
            </button>
          </div>

          {/* 显示已添加的宣言 */}
          {declaration.length > 0 && (
            <div className="space-y-3">
              {declaration.map((line, index) => (
                <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded">
                  <div className="flex-1">
                    <textarea
                      placeholder={`宣言 ${index + 1}`}
                      value={line}
                      onChange={(e) => {
                        const newDeclaration = [...declaration];
                        newDeclaration[index] = e.target.value;
                        setDeclaration(newDeclaration);
                      }}
                      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 text-sm"
                      rows={2}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newDeclaration = declaration.filter((_, i) => i !== index);
                      setDeclaration(newDeclaration);
                    }}
                    className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 提示信息 */}
          {declaration.length === 0 && (
            <div className="text-gray-500 text-sm bg-gray-50 p-3 rounded">
              暂无宣言内容，点击“添加宣言”按钮开始输入服务宣言。
            </div>
          )}

          {/* 服务宣言预览 */}
          {declaration.length > 0 && (
            <div className="p-4 bg-[#e3976d] rounded-lg shadow-md">
              <p className="text-base font-semibold text-white mb-3">📢 服务宣言预览：</p>
              <div className="space-y-1">
                {declaration.filter(line => line.trim()).map((line, index) => (
                  <div key={index} className="text-white text-sm">
                    <span className="font-semibold">{index + 1}.</span> <span className="opacity-90">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
          disabled={postcompanyCultureloading}
        >
          {postcompanyCultureloading ? "上传中..." : "上传"}
        </button>

        {/* 成功信息 */}
        {postcompanyCulturemessage && (
          <div className="mt-4 text-center text-green-600 text-lg font-medium">
            {postcompanyCulturemessage}
          </div>
        )}
      </form>
      {/* ----------------------------------------------- */}

      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">添加新闻</h2>
      <form onSubmit={postnews} className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">新闻标题</label>
          <input
            type="text"
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">新闻简介</label>
          <textarea
            className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={5}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">上传pdf新闻</label>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf,application/pdf"
              className="w-full border border-gray-600 px-4 py-2 rounded text-gray-900"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append('file', file);
                  try {
                    const response = await fetch('/api/upload-pdf', {
                      method: 'POST',
                      body: formData,
                    } as RequestInit);

                    if (response.ok) {
                      const data = await response.json();
                      setPdfUrl(data.filePath); // 你需要定义这个state
                    } else {
                      throw new Error('上传失败');
                    }
                  } catch (error) {
                    console.error('PDF上传错误:', error);
                    alert('PDF上传失败，请重试');
                  }
                }
              }}
              required
            />
          </div>
          {pdfUrl && (
            <div className="text-sm text-gray-600">已上传: {pdfUrl}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
          disabled={postnewDataLoading}
        >
          {postnewDataLoading ? "上传中..." : "上传"}
        </button>
        {/* 成功信息 */}
        {postnewDatamessage && (
          <div className="mt-4 text-center text-green-600 text-lg font-medium">
            {postnewDatamessage}
          </div>
        )}
      </form>
      {/* ----------------------------------------------- */}

      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">删除新闻</h2>
      <div className="space-y-8 mt-8">
        {/* 删除新闻标题 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">删除新闻</label>
          <div className="flex items-center space-x-4">
            {/* 输入框 */}
            <input
              type="text"
              placeholder="输入要删除的新闻标题"
              value={deletetotitle}
              onChange={(e) => setDeletetotitle(e.target.value)}
              className="flex-1 border border-gray-600 px-4 py-2 rounded text-gray-900"
            />
            {/* 删除按钮 */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`确定要删除标题为「${deletetotitle}」的新闻吗？`)) {
                  deletenews(deletetotitle);
                }
              }}
              className="min-w-[120px] bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 text-base px-4 py-2 rounded-md"
              disabled={deletenewsLoading}
            >
              {deletenewsLoading ? "删除中..." : "删除"}
            </button>
          </div>
        </div>

        {/* 删除状态提示 */}
        {deletenewsMessage && (
          <div className="mt-4 text-center text-red-600 text-lg font-medium">
            {deletenewsMessage}
          </div>
        )}
      </div>
      {/* ----------------------------------------------- */}

      <h2 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800 mt-10">修改店铺二维码</h2>
      <form onSubmit={postshopURLData} className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">京东二维码</label>
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
                    setJd(data.filePath);
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
          {jd && (
            <div className="text-sm text-gray-600">已上传: {jd}</div>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">抖音二维码</label>
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
                    setDy(data.filePath);
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
          {dy && (
            <div className="text-sm text-gray-600">已上传: {dy}</div>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">微信二维码</label>
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
                    setWx(data.filePath);
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
          {wx && (
            <div className="text-sm text-gray-600">已上传: {wx}</div>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">微信公众号二维码</label>
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
                    setWxgzh(data.filePath);
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
          {wxgzh && (
            <div className="text-sm text-gray-600">已上传: {wxgzh}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#DD773F] text-white py-3 rounded text-lg font-semibold hover:bg-[#c05e2d] transition"
          disabled={postshopURLDataloading}
        >
          {postshopURLDataloading ? "上传中..." : "上传"}
        </button>
        {/* 成功信息 */}
        {postshopURLDatamessage && (
          <div className="mt-4 text-center text-green-600 text-lg font-medium">
            {postshopURLDatamessage}
          </div>
        )}
      </form>
      {/* ----------------------------------------------- */}
    </div>
  );
}