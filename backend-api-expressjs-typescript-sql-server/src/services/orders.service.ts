/* 
export const getAllOrders = async () => {
    return await Order.find().populate('customer_id');
};

export const getOrderById = async (id: string) => {
    return await Order.findById(id).populate('customer_id');
};

export const createOrder = async (data: any) => {
    const newOrder = new Order(data);
    return await newOrder.save()
}

export const deleteOrder = async (id: string) => {
    return await Order.findByIdAndDelete(id);
}

 */