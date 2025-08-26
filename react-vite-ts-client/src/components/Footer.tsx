const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Footer content */}
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Cột 1: Thông tin */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Về chúng tôi</h3>
                        <p className="text-sm leading-relaxed">
                            Chúng tôi là công ty cung cấp sản phẩm chất lượng cao, dịch vụ tận tâm và giá cả hợp lý.
                        </p>
                    </div>

                    {/* Cột 2: Liên kết nhanh */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Liên kết nhanh</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Trang chủ</a></li>
                            <li><a href="#" className="hover:text-white">Sản phẩm</a></li>
                            <li><a href="#" className="hover:text-white">Dịch vụ</a></li>
                            <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                        </ul>
                    </div>

                    {/* Cột 3: Dịch vụ */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Dịch vụ</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Vận chuyển nhanh</a></li>
                            <li><a href="#" className="hover:text-white">Bảo hành</a></li>
                            <li><a href="#" className="hover:text-white">Hỗ trợ 24/7</a></li>
                            <li><a href="#" className="hover:text-white">Tư vấn miễn phí</a></li>
                        </ul>
                    </div>

                    {/* Cột 4: Liên hệ */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Liên hệ</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Email: info@example.com</li>
                            <li>Điện thoại: 0123 456 789</li>
                            <li>Địa chỉ: 123 Đường ABC, TP. HCM</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-gray-800 py-4">
                <div className="container mx-auto px-4 text-center text-sm">
                    © {new Date().getFullYear()} Công ty của bạn. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer;
