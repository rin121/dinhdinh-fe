import { Product, Category } from './types';

export const categories: Category[] = [
  { id: 'all', name: 'Tất cả', icon: '🍰' },
  { id: 'birthday', name: 'Bánh sinh nhật', icon: '🎂' },
  { id: 'wedding', name: 'Bánh cưới', icon: '💒' },
  { id: 'chocolate', name: 'Bánh chocolate', icon: '🍫' },
  { id: 'fruit', name: 'Bánh trái cây', icon: '🍓' },
  { id: 'special', name: 'Bánh đặc biệt', icon: '⭐' }
];

export const allProducts: Product[] = [
  {
    id: 1,
    slug: "banh-kem-vanilla",
    name: "Bánh Kem Vanilla",
    price: "250.000đ",
    image: "🍰",
    description: "Hương vị vanilla thơm ngọt, mềm mịn.",
    longDescription: "Bánh kem vanilla là sự lựa chọn cổ điển nhưng không bao giờ lỗi thời. Với lớp bánh bông lan mềm mịn, hòa quyện cùng lớp kem tươi vanilla ngọt ngào, chiếc bánh này phù hợp với mọi dịp, từ sinh nhật ấm cúng đến những buổi tiệc trà thanh lịch.",
    badge: "Bán chạy",
    category: "birthday",
    gallery: ["🍰", "🎂", "🧁"],
    sizes: [
      { size: 'S (6-inch)', price: '250.000đ', servings: 'Dành cho 4-6 người ăn' },
      { size: 'M (8-inch)', price: '350.000đ', servings: 'Dành cho 8-10 người ăn' },
      { size: 'L (10-inch)', price: '450.000đ', servings: 'Dành cho 12-15 người ăn' }
    ],
    ingredients: ['Bột mì', 'Trứng gà tươi', 'Đường tinh luyện', 'Sữa tươi không đường', 'Kem tươi whipping', 'Tinh chất Vanilla Madagascar'],
    allergens: ['Trứng', 'Sữa', 'Gluten']
  },
  {
    id: 2,
    slug: "banh-kem-chocolate",
    name: "Bánh Kem Chocolate",
    price: "299.000đ",
    image: "🍫",
    description: "Chocolate đậm đà, ngọt ngào.",
    longDescription: "Dành cho các tín đồ chocolate, chiếc bánh này là một bản giao hưởng của vị đắng nhẹ từ chocolate đen nguyên chất và vị ngọt ngào của lớp kem bơ chocolate. Mỗi miếng bánh tan chảy trong miệng, để lại dư vị khó quên.",
    badge: "Mới",
    category: "chocolate",
    gallery: ["🍫", "🍩", "🍪"],
    sizes: [
      { size: 'S (6-inch)', price: '299.000đ', servings: 'Dành cho 4-6 người ăn' },
      { size: 'M (8-inch)', price: '399.000đ', servings: 'Dành cho 8-10 người ăn' },
      { size: 'L (10-inch)', price: '499.000đ', servings: 'Dành cho 12-15 người ăn' }
    ],
    ingredients: ['Bột mì', 'Trứng', 'Đường', 'Sữa tươi', 'Kem tươi', 'Bột Cacao Barry', 'Chocolate đen 70%'],
    allergens: ['Trứng', 'Sữa', 'Gluten']
  },
  {
    id: 3,
    slug: "banh-kem-trai-cay",
    name: "Bánh Kem Trái Cây",
    price: "350.000đ",
    image: "🍓",
    description: "Trái cây tươi, nhiều vitamin.",
    longDescription: "Một lựa chọn tươi mát và tốt cho sức khỏe. Bánh được phủ đầy các loại trái cây tươi theo mùa như dâu tây, kiwi, và xoài trên lớp kem sữa chua thanh mát. Đây là món tráng miệng hoàn hảo cho mùa hè.",
    badge: "Hot",
    category: "fruit",
    gallery: ["🍓", "🥝", "🥭"],
    sizes: [
      { size: 'S (6-inch)', price: '350.000đ', servings: 'Dành cho 4-6 người ăn' },
      { size: 'M (8-inch)', price: '450.000đ', servings: 'Dành cho 8-10 người ăn' },
      { size: 'L (10-inch)', price: '550.000đ', servings: 'Dành cho 12-15 người ăn' }
    ],
    ingredients: ['Bột mì', 'Trứng', 'Đường', 'Sữa chua Hy Lạp', 'Kem tươi', 'Dâu tây', 'Kiwi', 'Xoài'],
    allergens: ['Trứng', 'Sữa', 'Gluten']
  },
  {
    id: 4,
    slug: 'banh-kem-matcha',
    name: 'Bánh Kem Matcha',
    price: '280.000đ',
    image: '🍵',
    description: 'Matcha Nhật Bản, thanh mát.',
    longDescription: 'Hương vị trà xanh matcha thượng hạng từ Uji, Nhật Bản, kết hợp hoàn hảo với đậu đỏ azuki ngọt bùi. Chiếc bánh mang đến sự cân bằng tinh tế giữa vị đắng nhẹ và ngọt thanh, một trải nghiệm ẩm thực độc đáo.',
    badge: 'Trending',
    category: 'special',
    gallery: ["🍵", "🌿", "🫘"],
    sizes: [
        { size: 'S (6-inch)', price: '280.000đ', servings: 'Dành cho 4-6 người ăn' },
        { size: 'M (8-inch)', price: '380.000đ', servings: 'Dành cho 8-10 người ăn' },
        { size: 'L (10-inch)', price: '480.000đ', servings: 'Dành cho 12-15 người ăn' }
    ],
    ingredients: ['Bột mì', 'Trứng', 'Đường', 'Sữa tươi', 'Bột matcha Uji', 'Đậu đỏ Azuki'],
    allergens: ['Trứng', 'Sữa', 'Gluten']
  },
  {
    id: 5,
    slug: 'banh-kem-tiramisu',
    name: 'Bánh Kem Tiramisu',
    price: '320.000đ',
    image: '☕',
    description: 'Hương vị cà phê Ý đặc biệt.',
    longDescription: 'Tiramisu cổ điển của Ý với các lớp bánh ladyfinger thấm đẫm cà phê espresso, xen kẽ với lớp kem phô mai mascarpone béo ngậy và được rắc một lớp bột cacao đắng nhẹ. Một món tráng miệng tinh tế và quyến rũ.',
    badge: 'Premium',
    category: 'special',
    gallery: ["☕", " mascarpone", "🍫"],
    sizes: [
        { size: 'S (6-inch)', price: '320.000đ', servings: 'Dành cho 4-6 người ăn' },
        { size: 'M (8-inch)', price: '420.000đ', servings: 'Dành cho 8-10 người ăn' }
    ],
    ingredients: ['Bánh Ladyfinger', 'Trứng', 'Đường', 'Phô mai Mascarpone', 'Cà phê Espresso', 'Rượu Marsala', 'Bột Cacao'],
    allergens: ['Trứng', 'Sữa', 'Gluten', 'Cồn']
  },
  {
    id: 6,
    slug: 'banh-kem-red-velvet',
    name: 'Bánh Kem Red Velvet',
    price: '380.000đ',
    image: '❤️',
    description: 'Màu đỏ quyến rũ, hương vị độc đáo.',
    longDescription: 'Bánh Red Velvet nổi bật với màu đỏ nhung quyến rũ và hương vị cacao thoang thoảng, kết hợp cùng lớp kem phô mai cream cheese chua nhẹ, béo ngậy. Đây là chiếc bánh của tình yêu và sự sang trọng.',
    badge: 'Limited',
    category: 'special',
    gallery: ["❤️", "🌹", "🍰"],
    sizes: [
        { size: 'S (6-inch)', price: '380.000đ', servings: 'Dành cho 4-6 người ăn' },
        { size: 'M (8-inch)', price: '480.000đ', servings: 'Dành cho 8-10 người ăn' },
    ],
    ingredients: ['Bột mì', 'Trứng', 'Đường', 'Bột Cacao', 'Màu thực phẩm đỏ', 'Kem phô mai', 'Bơ'],
    allergens: ['Trứng', 'Sữa', 'Gluten']
  },
  {
    id: 7,
    slug: 'banh-cuoi-hoa-hong',
    name: 'Bánh Cưới Hoa Hồng',
    price: '1.200.000đ',
    image: '🌹',
    description: 'Thiết kế hoa hồng lãng mạn.',
    longDescription: 'Một tuyệt tác cho ngày trọng đại của bạn. Bánh cưới được trang trí tỉ mỉ bằng những bông hoa hồng làm từ kem bơ, tạo nên vẻ ngoài lãng mạn và thanh lịch. Hương vị có thể tùy chỉnh theo yêu cầu của bạn.',
    badge: 'Wedding',
    category: 'wedding',
    gallery: ["🌹", "💍", "💒"],
    sizes: [
        { size: '2 tầng (6/8-inch)', price: '1.200.000đ', servings: 'Dành cho 20-25 người ăn' },
        { size: '3 tầng (6/8/10-inch)', price: '2.500.000đ', servings: 'Dành cho 40-50 người ăn' },
    ],
    ingredients: ['Tùy chỉnh theo yêu cầu'],
    allergens: ['Tùy chỉnh theo yêu cầu']
  },
  {
    id: 8,
    slug: 'banh-sinh-nhat-unicorn',
    name: 'Bánh Sinh Nhật Unicorn',
    price: '450.000đ',
    image: '🦄',
    description: 'Bánh unicorn đầy màu sắc cho trẻ em.',
    longDescription: 'Chiếc bánh trong mơ của mọi em bé! Bánh Unicorn được trang trí với sừng vàng, tai và bờm tóc bảy sắc cầu vồng rực rỡ. Bên trong là cốt bánh cầu vồng bất ngờ và thú vị.',
    badge: 'Birthday',
    category: 'birthday',
    gallery: ["🦄", "🌈", "✨"],
    sizes: [
        { size: 'M (8-inch)', price: '450.000đ', servings: 'Dành cho 8-10 người ăn' },
        { size: 'L (10-inch)', price: '550.000đ', servings: 'Dành cho 12-15 người ăn' }
    ],
    ingredients: ['Bột mì', 'Trứng', 'Đường', 'Kem tươi', 'Màu thực phẩm', 'Kẹo đường trang trí'],
    allergens: ['Trứng', 'Sữa', 'Gluten']
  },
  {
    id: 9,
    slug: 'banh-chocolate-den',
    name: 'Bánh Chocolate Đen',
    price: '280.000đ',
    image: '🍫',
    description: 'Chocolate đen nguyên chất, ít đường.',
    longDescription: 'Phiên bản lành mạnh hơn cho người yêu chocolate. Bánh sử dụng chocolate đen 85% và giảm lượng đường, mang lại vị đắng đậm đà đặc trưng và những lợi ích cho sức khỏe từ cacao.',
    badge: 'Healthy',
    category: 'chocolate',
    gallery: ["🍫", "🖤", "🌿"],
    sizes: [
        { size: 'S (6-inch)', price: '280.000đ', servings: 'Dành cho 4-6 người ăn' },
        { size: 'M (8-inch)', price: '360.000đ', servings: 'Dành cho 8-10 người ăn' },
    ],
    ingredients: ['Bột hạnh nhân', 'Trứng', 'Chất tạo ngọt tự nhiên', 'Bột Cacao', 'Chocolate đen 85%'],
    allergens: ['Trứng', 'Hạt']
  }
]; 