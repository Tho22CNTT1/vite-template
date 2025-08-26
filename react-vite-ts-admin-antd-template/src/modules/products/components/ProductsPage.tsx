import { useState } from "react";
import {
  Button,
  Flex,
  Modal,
  Table,
  Popconfirm,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { ProductType, ProductsResponse } from "./product.type";
import { fetchProducts, fetchDelete, fetchCreate, fetchUpdate, fetchCategories, fetchBrands } from "./product.service";
import { useAppMessage } from "../../../stores/useAppMessage";
import type { CategoryType, BrandType } from "./product.type";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

const toUploadFileFromUrl = (url?: string): UploadFile[] => {
  if (!url) return [];
  // Tự suy đoán tên file từ URL
  const name = url.split("/").pop() || "image.jpg";
  return [
    {
      uid: "-1",
      name,
      status: "done",
      url,
    } as UploadFile,
  ];
};

const getFileListFromEvent = (e: any) => {
  if (Array.isArray(e)) return e;
  return e?.fileList;
};

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();
  const { sendMessage } = useAppMessage();
  const queryClient = useQueryClient();

  // State modal add
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  // state filter
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [brandId, setBrandId] = useState<string | undefined>(undefined);
  // State modal edit
  const [itemSelected, setItemSelected] = useState<ProductType | null>(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [formEdit] = Form.useForm();

  // Query products
  const { data, isLoading } = useQuery<ProductsResponse>({
    queryKey: ["products", page, search, categoryId, brandId],
    queryFn: () => fetchProducts(page, limit, search, categoryId, brandId),
    placeholderData: keepPreviousData,
  });

  // Mutation delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => fetchDelete(id),
    onSuccess: () => {
      sendMessage({ msg: "Delete success", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["products", page, search, categoryId, brandId] });
    },
    onError: () => {
      sendMessage({ msg: "Delete error", type: "error" });
    },
  });

  // Mutation create (FormData)
  const createMutation = useMutation<any, Error, FormData>({
    mutationFn: (formData: FormData) => fetchCreate(formData),
    onSuccess: () => {
      sendMessage({ msg: "Create success", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["products", page, search, categoryId, brandId] });
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: () => {
      sendMessage({ msg: "Create error", type: "error" });
    },
  });

  // Mutation update (FormData)
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => fetchUpdate(id, formData),
    onSuccess: () => {
      sendMessage({ msg: "Update success", type: "success" });
      queryClient.invalidateQueries({ queryKey: ["products", page, search, categoryId, brandId] });
      setIsModalEditOpen(false);
      formEdit.resetFields();
      setItemSelected(null);
    },
    onError: () => {
      sendMessage({ msg: "Update error", type: "error" });
    },
  });

  // lấy danh sách category và brand
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  // Handle add
  const handleSubmitAdd = async () => {
    const values = await form.validateFields();

    const formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("price", String(values.price));
    formData.append("stock", String(values.stock));
    if (values.category_id) formData.append("category_id", values.category_id);
    if (values.brand_id) formData.append("brand_id", values.brand_id);

    const fileObj = values.thumbnail?.[0]?.originFileObj as File | undefined;
    if (fileObj) {
      formData.append("file", fileObj); // field name 'thumbnail' cho Multer/backend
    } else {
      // Nếu muốn bắt buộc file khi tạo mới, validate đã có rule required. Không có file -> sẽ không submit vào đây.
    }

    createMutation.mutate(formData);
  };

  // Handle edit open
  const handleOpenEdit = (record: ProductType) => {
    setItemSelected(record);

    // Đổ form + map thumbnail URL -> fileList
    formEdit.setFieldsValue({
      product_name: record.product_name,
      price: record.price,
      stock: record.stock,
      category_id: (record as any).category_id, // nếu có
      brand_id: (record as any).brand_id,       // nếu có
      thumbnail: toUploadFileFromUrl(record.thumbnail),
    });

    setIsModalEditOpen(true);
  };

  // Handle edit save
  const handleModalEditOk = async () => {
    const values = await formEdit.validateFields();
    if (!itemSelected) return;

    const formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("price", String(values.price));
    formData.append("stock", String(values.stock));
    if (values.category_id) formData.append("category_id", values.category_id);
    if (values.brand_id) formData.append("brand_id", values.brand_id);

    const fileList: UploadFile[] = values.thumbnail || [];
    const hasNewFile = fileList[0]?.originFileObj; // nếu người dùng chọn ảnh mới

    if (hasNewFile) {
      formData.append("file", fileList[0].originFileObj as File);
    }


    updateMutation.mutate({ id: itemSelected.id, formData });
  };

  // Handle edit cancel
  const handleModalEditCancel = () => {
    setIsModalEditOpen(false);
    setItemSelected(null);
  };

  const columns: ColumnsType<ProductType> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value: number) => (value ?? 0).toLocaleString() + " ₫",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url?: string) =>
        url ? (
          <img
            src={url}
            alt=""
            width={60}
            style={{ objectFit: "cover", borderRadius: 8 }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='100%25' height='100%25' fill='%23eee'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='10'%3En/a%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          "—"
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Flex gap={8}>
          <Button type="primary" onClick={() => handleOpenEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <>
      {/* Filter */}
      <Flex gap={8} style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm kiếm sản phẩm"
          allowClear
          onSearch={(val) => {
            setSearch(val);
            setPage(1);
          }}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Chọn danh mục"
          allowClear
          style={{ width: 180 }}
          value={categoryId}
          onChange={(val) => {
            setCategoryId(val);
            setPage(1);
          }}
          options={categories?.map((c: CategoryType) => ({
            label: c.category_name,
            value: c.id,
          }))}
        />
        <Select
          placeholder="Chọn thương hiệu"
          allowClear
          style={{ width: 180 }}
          value={brandId}
          onChange={(val) => {
            setBrandId(val);
            setPage(1);
          }}
          options={brands?.map((b: BrandType) => ({
            label: b.brand_name,
            value: b.id,
          }))}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm sản phẩm
        </Button>
      </Flex>

      <Flex justify="space-between" style={{ marginBottom: 16 }}>
        <h1>Product list</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm sản phẩm
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={data?.products || []}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.TotalRecord || 0,
          onChange: (p) => setPage(p),
        }}
      />

      {/* Modal thêm */}
      <Modal
        title="Thêm sản phẩm"
        open={isModalOpen}
        onOk={handleSubmitAdd}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={createMutation.isPending}
      >
        <div style={{ maxHeight: 350, overflowY: "auto" }}>
          <Form form={form} layout="vertical">
            <Form.Item
              name="product_name"
              label="Tên sản phẩm"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              name="stock"
              label="Tồn kho"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            {/* Nếu có category/brand khi tạo */}
            <Form.Item name="category_id" label="Danh mục">
              <Select
                allowClear
                options={categories?.map((c: CategoryType) => ({
                  label: c.category_name,
                  value: c.id,
                }))}
              />
            </Form.Item>
            <Form.Item name="brand_id" label="Thương hiệu">
              <Select
                allowClear
                options={brands?.map((b: BrandType) => ({
                  label: b.brand_name,
                  value: b.id,
                }))}
              />
            </Form.Item>

            {/* Upload ảnh - THÊM */}
            <Form.Item
              name="thumbnail"
              label="Hình ảnh"
              valuePropName="fileList"
              getValueFromEvent={getFileListFromEvent}
              rules={[{ required: true, message: "Vui lòng tải ảnh lên" }]}
            >
              <Upload
                name="file"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false} // Không auto upload
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Modal cập nhật */}
      <Modal
        title="Cập nhật sản phẩm"
        open={isModalEditOpen}
        onOk={handleModalEditOk}
        onCancel={handleModalEditCancel}
        confirmLoading={updateMutation.isPending}
      >
        <div style={{ maxHeight: 350, overflowY: "auto" }}>
          <Form form={formEdit} layout="vertical">
            <Form.Item
              name="product_name"
              label="Tên sản phẩm"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              name="stock"
              label="Tồn kho"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item name="category_id" label="Danh mục">
              <Select
                allowClear
                options={categories?.map((c: CategoryType) => ({
                  label: c.category_name,
                  value: c.id,
                }))}
              />
            </Form.Item>
            <Form.Item name="brand_id" label="Thương hiệu">
              <Select
                allowClear
                options={brands?.map((b: BrandType) => ({
                  label: b.brand_name,
                  value: b.id,
                }))}
              />
            </Form.Item>

            {/* Upload ảnh - SỬA */}
            <Form.Item
              name="thumbnail"
              label="Hình ảnh"
              valuePropName="fileList"
              getValueFromEvent={getFileListFromEvent}
              // Khi update không bắt buộc phải đổi ảnh
              rules={[{ required: false }]}
            >
              <Upload
                name="file"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ProductsPage;
