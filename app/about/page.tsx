"use client";

import Image from "next/image";
import React from 'react'

export default function ProductsPage() {
    // 你可以根据实际需求将这些数据通过 props 或 API 获取
    const aboutBanner = "/products.jpg"; // 请将图片放在 public 目录下
    const mainTitle = "关于我们";
    const subTitle = "我们专注于微型充气泵的研发与制造，致力于为客户提供高品质的产品与解决方案。";

    const AboutText = "上海巴克斯通智能科技有限公司办公总部所在：上海市奉贤区海湾旅游区奉炮公路1368号阿莱德科技产业园5号楼2楼，科技园毗邻杭州湾北部，东依自贸区临港新片区，西联上海化学工业区，北靠奉贤新城；距离虹桥国际机场，浦东国际机场和洋山国际深水港均在40分钟车程，构成了“上海40分钟城市圈”和“长三角1.5小时城市半径圈”，紧邻海湾大学城，交通便捷，环境优越；公司同时在上海宝山区湄星路1955弄4号门（机器人产业园）设有销售办事处，公司生产基地位于浙江省宁波市慈溪市周巷镇开发东路488号3楼。公司专业生产和销售智能微型充气泵、轮胎修补液、应急补胎工具、车载应急包和新能源汽车便携充电桩、随车充等充气充电应用产品，公司研发技术、采购运营、品质生产等管理人员在汽车充气泵行业15年以上专业管理服务经验，具备丰富的产品实战经验。公司发展目标为：持续发展成为国内外著名的汽车用品品牌，给客户提供便捷舒适的汽车用品及生活体验，为国内外新能源汽车提供完善配套的充气充电、安全自驾和移动储能产品，并提供持续、热情、贴心服务！公司坚持“以人为本、顾客至上、持续经营、技术创新”为经营宗旨，努力发展壮大公司团队和规模！"
    const AboutImage = "/About.png"
    
    const brandIntroduction = "巴克斯通以智能微型多功能车载充气泵，轮胎应急补胎工具，新能源汽车充电桩及车载应急包为核心产品，凭借卓越品质与贴心服务，专注为车主提供创新，便捷，安全，可靠的充气充电解决方案产品，致力于以卓越品质与前沿科技，成为行业内的标杆企业！BACST的由来是 “Battery（电池）”、“Air pump（充气泵） ”、“Charging station（充电桩）”、“Service（服务）” 、“Tire（轮胎）”5个英文单词缩写组成，代表了公司经营的主要商品及经营服务理念，基于上述商品类目外，公司始终为客户继续寻找车辆所需求的任何产品，服务广大用车客户群体。追求客户满意，一直是推动我们发展和前进的动力源泉！"
    
    const operationimage = "/operation.png"

    const managementIdea = "公司坚持‘以人为本、顾客至上、持续经营、技术创新’为经营宗旨，努力发展壮大公司团队和规模！"

    const declaration = [
        "1.巴克斯通以优异的产品、技术和服务迎接客户，并传达产品的意义和价值。",
        "2.巴克斯通为每位客户带去优质的汽车用品生活体验，并提供安全、安心、和谐的汽车生活服务。",
        "3.巴克斯通为实现人与车的和谐社会做出努力贡献。",
        "4.巴克斯通为追求汽车行业智能智联发展而发展。",
        "5.巴克斯通为客户提供的价值和目标不仅仅是销售汽车用品、配件，同时提供适合当下生活方式下汽车用品行业的新产品和服务；我们不断创造新价值，以满足客户对'安全'以及'和谐'为基础的汽车生活需求。"
    ];
    return (
        <main>
            <div className="relative w-full">
                {/* 背景图容器 */}
                <div className="relative w-full aspect-[16/7]">
                    <Image
                        src={aboutBanner}
                        alt="关于我们"
                        fill
                        style={{objectFit: "cover"}}
                        priority
                    />
                </div>
                {/* 内容部分 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#DD773F]">
                        {mainTitle}
                    </h1>
                    <p className="text-xl md:text-2xl max-w-5xl">
                        {subTitle}
                    </p>
                </div>
            </div>


            <section className="w-full px-6 py-16 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    {/* 左侧：公司简介 */}
                    <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F] font-serif">
                            ABOUT COMPANY
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F]">
                            公司简介
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            {AboutText}
                        </p>
                    </div>
                    {/* 右侧：公司图片 */}
                    <div className="flex-1 w-full">
                        <img
                            src={AboutImage}
                            alt="公司图片"
                            className="w-full h-auto rounded-lg shadow-lg object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="w-full px-6 py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 text-center md:text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F] font-serif">
                          BRAND INTRODUCTION
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F]">
                          品牌介绍
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            {brandIntroduction}
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full px-6 py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
                    <div className="flex-1 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F] font-serif">
                            BUSINESS DEVELOPMENT
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F]">
                            业务开展
                        </h2>
                    </div>
                    <div className="flex-1 w-full flex justify-center">
                        <img
                            src={operationimage}
                            alt="业务开展"
                            className="w-full max-w-2xl h-auto rounded-lg shadow-lg object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="w-full px-6 py-16 bg-white">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                  {/* 右侧：公司图片 */}
                    <div className="flex-1 text-center md:text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F] font-serif">
                            MANAGEMENT IDEA
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F]">
                            经营理念
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-700 font-serif italic tracking-wide 
                            px-8 py-6 border-l-4 border-[#DD773F] bg-gradient-to-r from-white to-gray-50
                            shadow-sm rounded-r-lg transform hover:scale-105 transition-transform duration-300
                            first-letter:text-3xl first-letter:font-bold first-letter:text-[#DD773F]">
                            {managementIdea}
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full px-6 py-16 bg-white">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                  {/* 右侧：公司图片 */}
                    <div className="flex-1 text-center md:text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F] font-serif">
                            SERVICE DECLARATION
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#DD773F]">
                            服务宣言
                        </h2>
                        <div className="text-left space-y-4">
                            {declaration.map((item, index) => (
                                <p key={index} className="text-lg leading-relaxed text-gray-700 font-serif italic tracking-wide 
                                    px-8 py-6 border-l-4 border-[#DD773F] bg-gradient-to-r from-white to-gray-50
                                    shadow-sm rounded-r-lg transform hover:scale-105 transition-transform duration-300
                                    first-letter:text-3xl first-letter:font-bold first-letter:text-[#DD773F]">
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



        </main>
    )
}