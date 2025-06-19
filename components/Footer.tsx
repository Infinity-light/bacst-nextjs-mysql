"use client";

import Image from "next/image";
import React, { useState, useEffect } from 'react'

// const contactBg = "/contact-bg.jpg"; // 请替换为你自己的大图路径
// const address = "上海市奉贤区海湾旅游区奉炮公路19999号";
// const phone = "15000256347";
// const adddress = "宝山山路10002号";
// const email = "Daniel.sun815@outlook.com";
// const FooterData = {
//     contactBg,
//     address,
//     phone,
//     adddress,
//     email,
// }

export default function Footer() {

    const [address, setaddress] = useState("x上海市奉贤区海湾旅游区奉炮公路1368号阿莱德科技园5号楼2楼");
    const [phone, setphone] = useState("x15000256347");
    const [adddress, setadddress] = useState("x浙江省宁波市慈溪市周巷镇开发东路488号3楼");
    const [email, setEmail] = useState("Daniel.sun815@outlook.com");

    const [jd, setJd] = useState("/jd.png");
    const [dy, setDy] = useState("/dy.png");
    const [wx, setWx] = useState("/wx.png");
    const [wxgzh, setWxgzh] = useState("/wxgzh.png");

    useEffect(() => {
        fetchgetaddress()
        fetchgetshopURLData()
    }, [])
    const fetchgetaddress = async () => {
        try {
            // 发起API请求获取首页数据
            const res = await fetch('/api/getaddress')
            const json = await res.json()
            const data = json.data[0]
            // 更新页面状态
            // 需要使用 useState 来定义状态和对应的 setter
            setaddress(data.address)
            setphone(data.phone)
            setadddress(data.adddress)
            setEmail(data.email)
        } catch (error) {
            // 错误处理
            console.error('获取首页数据失败:', error)
        }
    }
    const fetchgetshopURLData = async () => {
        try {
            // 发起API请求获取首页数据
            const res = await fetch('/api/getshopURLData')
            const json = await res.json()
            const data = json.data[0]
            // 更新页面状态
            // 需要使用 useState 来定义状态和对应的 setter
            setJd(data.jd)
            setDy(data.dy)
            setWx(data.wx)
            setWxgzh(data.wxgzh)
        } catch (error) {
            // 错误处理
            console.error('获取首页数据失败:', error)
        }
    }
    return (
        <footer className="w-full bg-gray-100 text-gray-700 py-10 px-6 ">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Logo 区域 */}
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/bakesit_logo_o.svg"
                            alt="Bakesit 图标"
                            width={40}
                            height={40}
                            priority
                        />
                        <Image
                            src="/bakesit_CNlogo_o.svg"
                            alt="Bakesit 中文标"
                            width={100}
                            height={40}
                            priority
                        />
                        <Image
                            src="/bakesit_ENlogo_o.svg"
                            alt="Bakesit 英文标"
                            width={100}
                            height={40}
                            priority
                        />
                    </div>
                    <p className="text-sm text-gray-500">沪ICP备2025110082号-1</p>
                </div>

                {/* 公司信息 */}
                <div className="text-sm space-y-2">
                    <p><span className="font-semibold">公司地址：</span>{address}</p>
                    <p><span className="font-semibold">工厂地址：</span>{adddress}</p>
                    <p><span className="font-semibold">联系电话：</span>{phone}</p>
                    <p><span className="font-semibold">邮箱：</span>{email}</p>
                </div>

                {/* 二维码区域 */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-8">
                        {/* 微信二维码 */}
                        <div className="flex flex-col items-center">
                            <Image
                                src={wx}
                                alt="微信二维码"
                                width={60}
                                height={60}
                                className="border border-gray-200 rounded-md"
                            />
                            <p className="text-xs mt-2 text-gray-600">微信</p>
                        </div>
                        
                        {/* 抖音小店二维码 */}
                        <div className="flex flex-col items-center">
                            <Image
                                src={dy}
                                alt="抖音小店二维码"
                                width={60}
                                height={60}
                                className="border border-gray-200 rounded-md"
                            />
                            <p className="text-xs mt-2 text-gray-600">抖音小店</p>
                        </div>

                        {/* 微信公众号二维码 */}
                        <div className="flex flex-col items-center">
                            <Image
                                src={wxgzh}
                                alt="微信公众号二维码"
                                width={60}
                                height={60}
                                className="border border-gray-200 rounded-md"
                            />
                            <p className="text-xs mt-2 text-gray-600">微信公众号</p>
                        </div>

                        {/* 京东二维码 */}
                        <div className="flex flex-col items-center">
                            <Image
                                src={jd}
                                alt="京东二维码"
                                width={60}
                                height={60}
                                className="border border-gray-200 rounded-md"
                            />
                            <p className="text-xs mt-2 text-gray-600">京东</p>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}
