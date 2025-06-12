import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 text-gray-700 py-10 px-6 ">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Logo 区域 */}
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4">
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
                    <p><span className="font-semibold">公司地址：</span>奉炮公路19999号</p>
                    <p><span className="font-semibold">工厂地址：</span>宝山山路10002号</p>
                    <p><span className="font-semibold">联系电话：</span>15000256347</p>
                    <p><span className="font-semibold">邮箱：</span>Daniel.sun815@outlook.com</p>
                </div>∏
            </div>
        </footer>
    );
}
